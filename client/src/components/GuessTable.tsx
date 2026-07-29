import { useGameStore } from '../stores/gameStore';
import { GuessRow } from './GuessRow';

export function GuessTable() {
  const guesses = useGameStore((s) => s.yourGuesses);

  return (
    <div className="space-y-1.5">
      {/* Column headers */}
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-6 shrink-0" />
        <div className="w-[100px] shrink-0 text-xs text-surface-500 font-medium">Player</div>
        <div className="flex gap-1.5">
          {['国家', '战队', '年龄', 'Major', '位置', 'Top排名'].map((label) => (
            <div key={label} className="min-w-[72px] text-center text-xs text-surface-500 font-medium">
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Guess rows */}
      {guesses.map((guess, i) => (
        <GuessRow
          key={guess.guessNumber}
          guess={guess}
          isNew={i === guesses.length - 1}
        />
      ))}

      {/* Empty rows */}
      {Array.from({ length: Math.max(0, 8 - guesses.length) }).map((_, i) => (
        <div key={`empty-${i}`} className="flex items-center gap-1.5 opacity-30">
          <div className="w-6 text-xs text-surface-500 text-right font-mono shrink-0">
            {guesses.length + i + 1}
          </div>
          <div className="w-[100px] shrink-0" />
          <div className="flex gap-1.5">
            {Array.from({ length: 6 }).map((_, j) => (
              <div
                key={j}
                className="min-w-[72px] h-[56px] rounded-lg border border-surface-700 bg-surface-900"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
