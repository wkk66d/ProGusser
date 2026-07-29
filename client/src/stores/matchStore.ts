import { create } from 'zustand';

interface MatchState {
  format: number;                       // 抢N: first to N wins
  currentRound: number;
  scores: Record<string, number>;       // peerId → wins ('me' = local player)
  isHost: boolean;

  setFormat: (n: number) => void;
  setHost: (host: boolean) => void;
  addWin: (peerId: string) => void;
  nextRound: () => void;
  resetMatch: () => void;

  isMatchOver: () => boolean;
  getWinner: () => string | null;       // returns 'me' or peerId
}

export const useMatchStore = create<MatchState>((set, get) => ({
  format: 1,
  currentRound: 1,
  scores: { me: 0 },
  isHost: false,

  setFormat: (n) => set({ format: n }),
  setHost: (host) => set({ isHost: host }),

  addWin: (peerId) =>
    set((s) => ({
      scores: {
        ...s.scores,
        [peerId]: (s.scores[peerId] || 0) + 1,
      },
    })),

  nextRound: () => set((s) => ({ currentRound: s.currentRound + 1 })),

  resetMatch: () => set({ format: 1, currentRound: 1, scores: { me: 0 } }),

  isMatchOver: () => {
    const { format, scores } = get();
    return Object.values(scores).some((w) => w >= format);
  },

  getWinner: () => {
    const { format, scores } = get();
    for (const [id, wins] of Object.entries(scores)) {
      if (wins >= format) return id;
    }
    return null;
  },
}));
