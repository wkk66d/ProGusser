import { create } from 'zustand';
import type { Player, GuessResult, OpponentGuessRow, OpponentGuessMap, GamePhase, FeedbackColor } from '../types/game';

interface GameState {
  phase: GamePhase;
  targetPlayer: Player | null;
  yourGuesses: GuessResult[];
  opponentGuessMap: OpponentGuessMap;   // peerId → guesses[]
  timeRemaining: number;
  roundWinner: string | null;           // 'me' | peerId | null (null=draw)
  yourNonce: string | null;
  opponentNonce: string | null;
  iTimedOut: boolean;
  timedOutPeers: Set<string>;
  exhaustedPeers: Set<string>;

  setPhase: (phase: GamePhase) => void;
  setTarget: (player: Player) => void;
  addYourGuess: (result: GuessResult) => void;
  addOpponentGuess: (peerId: string, guessIndex: number, colors: FeedbackColor[]) => void;
  setTimeRemaining: (t: number) => void;
  tick: () => void;
  setWinner: (w: string | null) => void;  // null = draw
  setNonces: (your: string, opponent: string) => void;
  setITimedOut: () => void;
  setOpponentTimedOut: (peerId: string) => void;
  timedOutPeerCount: () => number;
  setPeerExhausted: (peerId: string) => void;
  exhaustedPeerCount: () => number;
  resetRound: () => void;
  getRemainingGuesses: () => number;
  isCorrectFound: () => boolean;
}

const MAX_GUESSES = 8;
const ROUND_TIME = 120;
export { MAX_GUESSES, ROUND_TIME };

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'idle',
  targetPlayer: null,
  yourGuesses: [],
  opponentGuessMap: {},
  timeRemaining: ROUND_TIME,
  roundWinner: null,
  yourNonce: null,
  opponentNonce: null,
  iTimedOut: false,
  timedOutPeers: new Set(),
  exhaustedPeers: new Set(),

  setPhase: (phase) => set({ phase }),
  setTarget: (player) => set({ targetPlayer: player }),

  addYourGuess: (result) =>
    set((s) => ({ yourGuesses: [...s.yourGuesses, result] })),

  addOpponentGuess: (peerId, guessIndex, colors) =>
    set((s) => {
      const existing = s.opponentGuessMap[peerId] || [];
      return {
        opponentGuessMap: {
          ...s.opponentGuessMap,
          [peerId]: [...existing, { guessIndex, colors, timestamp: Date.now() }],
        },
      };
    }),

  setTimeRemaining: (t) => set({ timeRemaining: t }),

  tick: () =>
    set((s) => {
      if (s.timeRemaining <= 0 || s.phase !== 'playing') return s;
      return { timeRemaining: s.timeRemaining - 1 };
    }),

  setWinner: (w) => set({ roundWinner: w, phase: 'round_end' }),

  setNonces: (your, opponent) => set({ yourNonce: your, opponentNonce: opponent }),

  setITimedOut: () => set((s) => ({ iTimedOut: true })),

  setOpponentTimedOut: (peerId) =>
    set((s) => {
      const next = new Set(s.timedOutPeers);
      next.add(peerId);
      return { timedOutPeers: next };
    }),

  // Peer timers — used by connection.ts for allTimedOut() check
  timedOutPeerCount: () => get().timedOutPeers.size,

  setPeerExhausted: (peerId) =>
    set((s) => {
      const next = new Set(s.exhaustedPeers);
      next.add(peerId);
      return { exhaustedPeers: next };
    }),

  exhaustedPeerCount: () => get().exhaustedPeers.size,

  resetRound: () =>
    set({
      phase: 'playing',
      targetPlayer: null,
      yourGuesses: [],
      opponentGuessMap: {},
      timeRemaining: ROUND_TIME,
      roundWinner: null,
      yourNonce: null,
      opponentNonce: null,
      iTimedOut: false,
      timedOutPeers: new Set(),
      exhaustedPeers: new Set(),
    }),

  getRemainingGuesses: () => MAX_GUESSES - get().yourGuesses.length,

  isCorrectFound: () =>
    get().yourGuesses.some((g) => g.feedback.every((f) => f.color === 'green')),
}));
