import { create } from 'zustand';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface RemotePeer {
  peerId: string;
  nickname: string;
  connected: boolean;  // DataChannel open
}

interface ConnectionState {
  status: ConnectionStatus;
  roomCode: string | null;
  myPeerId: string | null;
  nickname: string;
  isHost: boolean;
  remotePeers: RemotePeer[];      // All other players in room
  error: string | null;
  signalingUrl: string;

  setStatus: (s: ConnectionStatus) => void;
  setRoomCode: (code: string | null) => void;
  setMyPeerId: (id: string | null) => void;
  setNickname: (n: string) => void;
  setHost: (host: boolean) => void;
  setRemotePeers: (peers: { peerId: string; nickname: string }[]) => void;
  addRemotePeer: (peerId: string, nickname: string) => void;
  removeRemotePeer: (peerId: string) => void;
  setPeerConnected: (peerId: string, connected: boolean) => void;
  setError: (err: string | null) => void;
  setSignalingUrl: (url: string) => void;
  reset: () => void;
}

const DEFAULT_SIGNALING = import.meta.env.VITE_SIGNALING_URL || 'ws://localhost:3001';

function loadSignalingUrl(): string {
  try { return localStorage.getItem('progusser_signaling_url') || DEFAULT_SIGNALING; }
  catch { return DEFAULT_SIGNALING; }
}
function loadNickname(): string {
  try { return localStorage.getItem('progusser_nickname') || ''; }
  catch { return ''; }
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  status: 'disconnected',
  roomCode: null,
  myPeerId: null,
  nickname: loadNickname(),
  isHost: false,
  remotePeers: [],
  error: null,
  signalingUrl: loadSignalingUrl(),

  setStatus: (s) => set({ status: s }),
  setRoomCode: (code) => set({ roomCode: code }),
  setMyPeerId: (id) => set({ myPeerId: id }),
  setNickname: (n) => {
    try { localStorage.setItem('progusser_nickname', n); } catch { /* ignore */ }
    set({ nickname: n });
  },
  setHost: (host) => set({ isHost: host }),
  setRemotePeers: (peers) => set({
    remotePeers: peers.map((p) => ({ peerId: p.peerId, nickname: p.nickname, connected: false })),
  }),
  addRemotePeer: (peerId, nickname) =>
    set((s) => ({
      remotePeers: [...s.remotePeers, { peerId, nickname, connected: false }],
    })),
  removeRemotePeer: (peerId) =>
    set((s) => ({
      remotePeers: s.remotePeers.filter((p) => p.peerId !== peerId),
    })),
  setPeerConnected: (peerId, connected) =>
    set((s) => ({
      remotePeers: s.remotePeers.map((p) =>
        p.peerId === peerId ? { ...p, connected } : p
      ),
    })),
  setError: (err) => set({ error: err, status: err ? 'error' : 'disconnected' }),
  setSignalingUrl: (url) => {
    try { localStorage.setItem('progusser_signaling_url', url); } catch { /* ignore */ }
    set({ signalingUrl: url });
  },
  reset: () => set({
    status: 'disconnected', roomCode: null, myPeerId: null, isHost: false,
    remotePeers: [], error: null,
  }),
}));
