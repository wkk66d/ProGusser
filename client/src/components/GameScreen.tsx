import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../stores/gameStore';
import { useMatchStore } from '../stores/matchStore';
import { useConnectionStore } from '../stores/connectionStore';
import { onTimeout, startRound } from '../p2p/connection';
import { Timer } from './Timer';
import { GuessInput } from './GuessInput';
import { GuessTable } from './GuessTable';
import { OpponentColumn } from './OpponentColumn';

export function GameScreen() {
  const phase = useGameStore((s) => s.phase);
  const timeRemaining = useGameStore((s) => s.timeRemaining);
  const tick = useGameStore((s) => s.tick);
  const roundWinner = useGameStore((s) => s.roundWinner);
  const targetPlayer = useGameStore((s) => s.targetPlayer);
  const iTimedOut = useGameStore((s) => s.iTimedOut);
  const setPhase = useGameStore((s) => s.setPhase);

  const format = useMatchStore((s) => s.format);
  const currentRound = useMatchStore((s) => s.currentRound);
  const scores = useMatchStore((s) => s.scores);
  const isMatchOver = useMatchStore((s) => s.isMatchOver);
  const nickname = useConnectionStore((s) => s.nickname);
  const remotePeers = useConnectionStore((s) => s.remotePeers);

  const connectedPeers = remotePeers.filter((p) => p.connected);

  function peerName(id: string): string {
    if (id === 'me') return nickname || '你';
    return remotePeers.find((p) => p.peerId === id)?.nickname || id;
  }

  // Timer
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (phase === 'playing') {
      timerRef.current = setInterval(() => tick(), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, tick]);

  // Timer expiry
  useEffect(() => {
    if (phase === 'playing' && timeRemaining <= 0 && roundWinner === null && !iTimedOut) {
      onTimeout();
    }
  }, [timeRemaining, phase, roundWinner, iTimedOut]);

  const handleNextRound = useCallback(() => {
    if (isMatchOver()) setPhase('match_end');
    else startRound();
  }, [isMatchOver, setPhase]);

  // Total players = me + connected peers
  const allPlayers = ['me', ...connectedPeers.map((p) => p.peerId)];

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      {/* Top Bar — all player scores */}
      <header className="sticky top-0 z-20 bg-surface-950/90 backdrop-blur border-b border-surface-800">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-3">
          <span className="text-sm font-bold text-white tracking-tight shrink-0">
            Pro<span className="text-feedback-green">Gusser</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-800 text-surface-400 font-mono shrink-0">
            抢{format}
          </span>
          <span className="text-[10px] text-surface-400 shrink-0">R{currentRound}</span>
          <Timer />
          {/* Score row — all players */}
          <div className="flex items-center gap-2 ml-auto overflow-x-auto">
            {allPlayers.map((id) => (
              <span
                key={id}
                className={`text-[11px] whitespace-nowrap px-2 py-0.5 rounded ${
                  id === 'me'
                    ? 'text-feedback-green font-bold'
                    : 'text-surface-300'
                }`}
              >
                {peerName(id)} {scores[id] || 0}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-3 flex flex-col gap-3">
        {/* Opponent Columns — side by side, flex-1 auto-width */}
        {connectedPeers.length > 0 && (
          <section className="bg-surface-900 rounded-xl border border-surface-800 p-3">
            <div className="flex gap-2">
              {connectedPeers.map((peer) => (
                <OpponentColumn
                  key={peer.peerId}
                  peerId={peer.peerId}
                  nickname={peer.nickname}
                />
              ))}
            </div>
          </section>
        )}

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-surface-800" />
          <span className="text-[10px] text-surface-600 uppercase tracking-wider font-medium">
            {nickname || '我'}
          </span>
          <div className="flex-1 h-px bg-surface-800" />
        </div>

        {/* Your Panel */}
        <section className="flex-1 flex flex-col min-h-0">
          <div className="mb-3">
            <GuessInput />
          </div>
          <div className="flex-1 overflow-y-auto">
            <GuessTable />
          </div>
        </section>

        {/* Round End Overlay */}
        {phase === 'round_end' && (
          <div className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-surface-900 border border-surface-700 rounded-2xl p-8 max-w-md w-full mx-4 text-center">
              <div className="text-5xl mb-4">
                {roundWinner === 'me' ? '🎉' : roundWinner ? '😔' : '🤝'}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {roundWinner === 'me' ? '你猜中了！' : roundWinner ? `${peerName(roundWinner)} 猜中了！` : '平局！'}
              </h2>
              {targetPlayer && (
                <p className="text-surface-400 mb-4">
                  目标选手是{' '}
                  <span className="text-white font-bold">{targetPlayer.name}</span>
                  {' '}({targetPlayer.team})
                </p>
              )}
              <div className="bg-surface-800 rounded-lg p-4 mb-4">
                <div className="text-xs text-surface-500 mb-1">比分</div>
                <div className="text-xs text-surface-300 space-y-0.5">
                  {Object.entries(scores).map(([id, wins]) => (
                    <div key={id} className="flex justify-between">
                      <span className={id === 'me' ? 'text-feedback-green' : ''}>
                        {peerName(id)}
                      </span>
                      <span className="text-white font-bold">{wins}</span>
                    </div>
                  ))}
                </div>
              </div>
              {!isMatchOver() ? (
                <button onClick={handleNextRound}
                  className="w-full py-3 px-6 bg-feedback-green hover:bg-feedback-green/80 text-white font-bold rounded-xl transition-all duration-200 text-lg">
                  下一轮
                </button>
              ) : (
                <button onClick={() => setPhase('match_end')}
                  className="w-full py-3 px-6 bg-feedback-yellow hover:bg-feedback-yellow/80 text-white font-bold rounded-xl transition-all duration-200 text-lg">
                  查看结果
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
