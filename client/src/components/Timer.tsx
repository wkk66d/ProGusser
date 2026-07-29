import { useGameStore } from '../stores/gameStore';

export function Timer() {
  const timeRemaining = useGameStore((s) => s.timeRemaining);
  const phase = useGameStore((s) => s.phase);

  if (phase !== 'playing') return null;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isLow = timeRemaining <= 30;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-mono font-bold transition-colors ${
        isLow
          ? 'bg-red-900/40 text-red-400 timer-warning'
          : 'bg-surface-800 text-surface-200'
      }`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
      {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
