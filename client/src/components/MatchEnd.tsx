import { useMatchStore } from '../stores/matchStore';
import { useGameStore } from '../stores/gameStore';
import { useConnectionStore } from '../stores/connectionStore';
import { cleanup } from '../p2p/connection';

export function MatchEnd() {
  const scores = useMatchStore((s) => s.scores);
  const format = useMatchStore((s) => s.format);
  const resetMatch = useMatchStore((s) => s.resetMatch);
  const nickname = useConnectionStore((s) => s.nickname);
  const remotePeers = useConnectionStore((s) => s.remotePeers);
  const getWinner = useMatchStore((s) => s.getWinner);

  const winnerId = getWinner();
  const youWon = winnerId === 'me';

  function peerName(id: string): string {
    if (id === 'me') return nickname || '你';
    return remotePeers.find((p) => p.peerId === id)?.nickname || id;
  }

  return (
    <div className="w-full max-w-md text-center">
      <div className="mb-8">
        <div className={`text-7xl mb-4 ${youWon ? '' : 'grayscale'}`}>
          {youWon ? '🏆' : '😔'}
        </div>
        <h1 className={`text-3xl font-bold mb-2 ${youWon ? 'text-feedback-green' : 'text-red-400'}`}>
          {youWon ? '你赢了！' : `${peerName(winnerId || '')} 赢了`}
        </h1>
        <p className="text-surface-400 text-sm mb-4">抢{format} · 最终排名</p>
        <div className="bg-surface-800 rounded-xl p-4 space-y-1">
          {Object.entries(scores)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .map(([id, wins]) => (
              <div key={id} className="flex justify-between text-sm">
                <span className={id === 'me' ? 'text-feedback-green font-bold' : 'text-surface-300'}>
                  {peerName(id)}
                </span>
                <span className="text-white font-mono font-bold">{wins} 胜</span>
              </div>
            ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            resetMatch();
            useGameStore.getState().setPhase('idle');
          }}
          className="flex-1 py-4 bg-feedback-green hover:bg-feedback-green/80 text-white font-bold rounded-xl transition-all active:scale-[0.98]"
        >
          再来一局
        </button>
        <button
          onClick={() => cleanup()}
          className="flex-1 py-4 bg-surface-800 hover:bg-surface-700 text-surface-300 font-bold rounded-xl border border-surface-600 transition-all active:scale-[0.98]"
        >
          离开
        </button>
      </div>
    </div>
  );
}
