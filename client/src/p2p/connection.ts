// ============================================================
// P2P Connection Manager — Multi-peer WebRTC mesh
// ============================================================

import { useConnectionStore } from '../stores/connectionStore';
import { useGameStore } from '../stores/gameStore';
import { useMatchStore } from '../stores/matchStore';
import { PLAYERS } from '../data/players';
import type { FeedbackColor, GameMessage, SignalingMessage } from '../types/game';
import { computeFeedback, isCorrectGuess } from '../engine/feedback';
import { generateNonce, selectTarget } from '../engine/target';

function getSignalingUrl(): string {
  return useConnectionStore.getState().signalingUrl;
}

const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
  ],
};

let ws: WebSocket | null = null;
const peers = new Map<string, { pc: RTCPeerConnection; dc: RTCDataChannel | null }>();
let matchConfigAcks = 0;
let pendingNonceBs: string[] = [];        // collected nonceBs from all peers
let pendingNonceA: string | null = null;  // host's nonceA

// ============================================================
// Signaling
// ============================================================

export function createRoom(): void {
  const store = useConnectionStore.getState();
  store.setStatus('connecting');
  store.setHost(true);
  ws = new WebSocket(getSignalingUrl());
  ws.onopen = () => sendSig({ type: 'create', nickname: store.nickname || 'Host' });
  setupSig();
}

export function joinRoom(code: string): void {
  const store = useConnectionStore.getState();
  store.setStatus('connecting');
  store.setHost(false);
  ws = new WebSocket(getSignalingUrl());
  ws.onopen = () => sendSig({ type: 'join', room: code.toUpperCase(), nickname: store.nickname || 'Player' });
  setupSig();
}

function setupSig(): void {
  if (!ws) return;
  ws.onmessage = async (e: MessageEvent) => {
    const msg: SignalingMessage = JSON.parse(e.data as string);

    switch (msg.type) {
      case 'room_created':
        useConnectionStore.getState().setRoomCode(msg.room ?? null);
        useConnectionStore.getState().setMyPeerId(msg.peerId ?? null);
        useConnectionStore.getState().setRemotePeers(msg.peers || []);
        useConnectionStore.getState().setStatus('connected');
        break;

      case 'room_joined':
        useConnectionStore.getState().setRoomCode(msg.room ?? null);
        useConnectionStore.getState().setMyPeerId(msg.peerId ?? null);
        useConnectionStore.getState().setRemotePeers(msg.peers || []);
        useConnectionStore.getState().setStatus('connected');
        for (const p of msg.peers || []) {
          await connectToPeer(p.peerId);
        }
        break;

      case 'peer_joined':
        useConnectionStore.getState().addRemotePeer(msg.peerId!, msg.nickname ?? 'Unknown');
        break;

      case 'peer_left':
        useConnectionStore.getState().removeRemotePeer(msg.peerId!);
        disconnectPeer(msg.peerId!);
        break;

      case 'signal':
        await handleSignal(msg.data);
        break;

      case 'error':
        useConnectionStore.getState().setError(msg.message || 'Unknown error');
        break;
    }
  };
  ws.onclose = () => useConnectionStore.getState().setStatus('disconnected');
  ws.onerror = () => useConnectionStore.getState().setError('Connection failed');
}

function sendSig(msg: Record<string, unknown>): void {
  if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg));
}

// ============================================================
// WebRTC — one PC per remote peer (mesh)
// ============================================================

async function connectToPeer(targetPeerId: string): Promise<void> {
  if (peers.has(targetPeerId)) return; // already connecting

  const pc = new RTCPeerConnection(ICE_SERVERS);
  peers.set(targetPeerId, { pc, dc: null });

  pc.onicecandidate = (ev) => {
    if (ev.candidate) {
      sendSig({
        type: 'signal',
        data: { targetPeerId, candidate: ev.candidate },
      });
    }
  };

  pc.onconnectionstatechange = () => {
    if (pc.connectionState === 'connected' || pc.connectionState === 'connecting') {
      // wait
    } else if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
      useConnectionStore.getState().setPeerConnected(targetPeerId, false);
    }
  };

  pc.ondatachannel = (ev) => {
    const ch = ev.channel;
    peers.get(targetPeerId)!.dc = ch;
    setupDC(ch, targetPeerId);
  };

  // Create DataChannel (we're the offerer)
  const ch = pc.createDataChannel('game', { ordered: true });
  peers.get(targetPeerId)!.dc = ch;
  setupDC(ch, targetPeerId);

  try {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    sendSig({
      type: 'signal',
      data: { targetPeerId, description: offer },
    });
  } catch (e) {
    console.error('Offer error:', e);
  }
}

async function handleSignal(data: any): Promise<void> {
  const sourceId = data.sourcePeerId as string;
  if (!sourceId) return;

  let entry = peers.get(sourceId);
  if (!entry) {
    // Incoming connection from a peer we haven't initiated to
    const pc = new RTCPeerConnection(ICE_SERVERS);
    entry = { pc, dc: null };
    peers.set(sourceId, entry);

    pc.onicecandidate = (ev) => {
      if (ev.candidate) {
        sendSig({ type: 'signal', data: { targetPeerId: sourceId, candidate: ev.candidate } });
      }
    };
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'connected') {
        useConnectionStore.getState().setPeerConnected(sourceId, true);
      }
    };
    pc.ondatachannel = (ev) => {
      entry!.dc = ev.channel;
      setupDC(ev.channel, sourceId);
    };
  }

  const { pc } = entry;

  try {
    if (data.candidate) {
      await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    } else if (data.description) {
      const desc = data.description as RTCSessionDescriptionInit;
      if (desc.type === 'offer') {
        await pc.setRemoteDescription(new RTCSessionDescription(desc));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        sendSig({
          type: 'signal',
          data: { targetPeerId: sourceId, description: answer },
        });
      } else if (desc.type === 'answer') {
        await pc.setRemoteDescription(new RTCSessionDescription(desc));
      }
    }
  } catch (e) {
    console.error('Signal error:', e);
  }
}

function disconnectPeer(peerId: string): void {
  const entry = peers.get(peerId);
  if (entry) {
    entry.dc?.close();
    entry.pc.close();
    peers.delete(peerId);
  }
}

// ============================================================
// DataChannel per peer
// ============================================================

function setupDC(ch: RTCDataChannel, peerId: string): void {
  ch.onopen = () => {
    useConnectionStore.getState().setPeerConnected(peerId, true);
  };
  ch.onmessage = (ev: MessageEvent) => {
    handleGameMsg(JSON.parse(ev.data as string), peerId);
  };
  ch.onclose = () => {
    useConnectionStore.getState().setPeerConnected(peerId, false);
  };
}

function sendGame(peerId: string, msg: GameMessage): void {
  const entry = peers.get(peerId);
  if (entry?.dc?.readyState === 'open') {
    entry.dc.send(JSON.stringify(msg));
  }
}

function broadcastGame(msg: GameMessage): void {
  for (const [, entry] of peers) {
    if (entry.dc?.readyState === 'open') {
      entry.dc.send(JSON.stringify(msg));
    }
  }
}

// ============================================================
// Game Message Handler
// ============================================================

function handleGameMsg(msg: GameMessage, fromPeerId: string): void {
  const game = useGameStore.getState();
  const match = useMatchStore.getState();

  switch (msg.type) {
    case 'MATCH_CONFIG':
      game.setPhase('setup');
      match.setFormat(msg.format);
      sendGame(fromPeerId, { type: 'MATCH_CONFIG_ACK' });
      break;

    case 'MATCH_CONFIG_ACK':
      matchConfigAcks++;
      const totalPeers = useConnectionStore.getState().remotePeers.length;
      if (matchConfigAcks >= totalPeers) {
        matchConfigAcks = 0;
        startRound();
      }
      break;

    case 'ROUND_START': {
      // Non-host: receive host's nonceA, reply with our nonceB
      game.resetRound();
      game.setPhase('playing'); // show game UI (target pending)
      const yourNonce = generateNonce();
      game.setNonces(yourNonce, msg.nonceA);
      sendGame(fromPeerId, { type: 'ROUND_START_ACK', nonceB: yourNonce });
      // Wait for ROUND_TARGET from host
      break;
    }

    case 'ROUND_START_ACK': {
      // Host collects nonceB from a peer
      pendingNonceBs.push(msg.nonceB);
      const allPeers = useConnectionStore.getState().remotePeers;
      if (pendingNonceBs.length >= allPeers.length) {
        // All ACKs in — combine all nonces
        const allNonces = [pendingNonceA!, ...pendingNonceBs].sort();
        const seed = allNonces.join(':');
        const target = selectTarget(seed, PLAYERS);
        game.setTarget(target);
        game.setPhase('playing');
        broadcastGame({ type: 'ROUND_TARGET', seed });
        pendingNonceBs = [];
        pendingNonceA = null;
      }
      break;
    }

    case 'ROUND_TARGET': {
      // Non-host receives final seed from host
      const target = selectTarget(msg.seed, PLAYERS);
      game.setTarget(target);
      game.setPhase('playing');
      break;
    }

    case 'GUESS':
      game.addOpponentGuess(fromPeerId, msg.guessIndex, msg.colors);
      break;

    case 'CORRECT_GUESS':
      game.setWinner(fromPeerId);
      match.addWin(fromPeerId);
      break;

    case 'GUESSES_EXHAUSTED': {
      game.setPeerExhausted(fromPeerId);
      const allPeers = useConnectionStore.getState().remotePeers.filter(p => p.connected);
      const exhaustedCount = game.exhaustedPeerCount();
      const weExhausted = game.yourGuesses.length >= 8;
      if (weExhausted && exhaustedCount >= allPeers.length) game.setWinner(null);
      break;
    }

    case 'TIME_UP': {
      game.setOpponentTimedOut(fromPeerId);
      const allPeers = useConnectionStore.getState().remotePeers.filter(p => p.connected);
      const timedOutCount = game.timedOutPeerCount();
      if (game.iTimedOut && timedOutCount >= allPeers.length) {
        game.setWinner(null); // all timed out = draw
      } else if (!game.iTimedOut && game.roundWinner === null) {
        game.setWinner('me');
        match.addWin('me');
      }
      break;
    }

    case 'MATCH_OVER':
    case 'REMATCH':
      game.resetRound();
      match.resetMatch();
      break;

    case 'DISCONNECT':
      useConnectionStore.getState().setPeerConnected(fromPeerId, false);
      break;
  }
}

// ============================================================
// Public API (called by UI)
// ============================================================

export function sendMatchConfig(format: number): void {
  matchConfigAcks = 0;
  useMatchStore.getState().setFormat(format);
  broadcastGame({ type: 'MATCH_CONFIG', format });
}

export function startRound(): void {
  const game = useGameStore.getState();
  if (game.phase === 'playing' && game.targetPlayer !== null) return;
  game.resetRound();
  game.setPhase('playing'); // show UI (target pending)

  pendingNonceBs = [];
  pendingNonceA = generateNonce();
  game.setNonces(pendingNonceA, '');
  broadcastGame({ type: 'ROUND_START', nonceA: pendingNonceA });
}

export function submitGuess(playerName: string): void {
  const game = useGameStore.getState();
  const target = game.targetPlayer;
  if (!target || game.phase !== 'playing') return;

  const player = PLAYERS.find((p) => p.name === playerName);
  if (!player) return;

  const feedback = computeFeedback(player, target);
  const guessIndex = game.yourGuesses.length + 1;

  game.addYourGuess({ player, feedback, guessNumber: guessIndex, timestamp: Date.now() });
  const colors: FeedbackColor[] = feedback.map((f) => f.color);
  broadcastGame({ type: 'GUESS', guessIndex, colors });

  if (isCorrectGuess(feedback)) {
    game.setWinner('me');
    useMatchStore.getState().addWin('me');
    broadcastGame({ type: 'CORRECT_GUESS', guessIndex });
    return;
  }

  if (game.yourGuesses.length >= 8) {
    broadcastGame({ type: 'GUESSES_EXHAUSTED' });
    game.setPeerExhausted('me');
    const exhaustedAll = game.exhaustedPeerCount() >= peers.size;
    if (exhaustedAll) game.setWinner(null); // draw
  }
}

export function onTimeout(): void {
  const game = useGameStore.getState();
  if (game.roundWinner !== null) return;
  game.setITimedOut();
  broadcastGame({ type: 'TIME_UP' });
  // If all connected peers also timed out → draw
  const allPeers = useConnectionStore.getState().remotePeers.filter(p => p.connected);
  if (game.timedOutPeerCount() >= allPeers.length) {
    game.setWinner(null); // null = draw
  }
}

export function cleanup(): void {
  matchConfigAcks = 0;
  pendingNonceBs = [];
  pendingNonceA = null;
  for (const [, entry] of peers) {
    entry.dc?.close();
    entry.pc.close();
  }
  peers.clear();
  ws?.close();
  ws = null;
  useConnectionStore.getState().reset();
}
