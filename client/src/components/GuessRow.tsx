import type { GuessResult } from '../types/game';
import { AttributeCell } from './AttributeCell';

export function GuessRow({ guess, isNew }: { guess: GuessResult; isNew: boolean }) {
  const { player, feedback, guessNumber } = guess;
  // Exclude the 'name' attribute — we show player name separately
  const cells = feedback;

  return (
    <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2 duration-200">
      {/* Guess number */}
      <div className="w-6 text-xs text-surface-500 text-right font-mono shrink-0">
        {guessNumber}
      </div>

      {/* Player name */}
      <div className="w-[100px] shrink-0 px-2 py-2 text-sm font-semibold text-white truncate">
        {player.name}
      </div>

      {/* Attribute cells */}
      <div className="flex gap-1.5 overflow-x-auto">
        {cells.map((fb, i) => (
          <AttributeCell
            key={fb.attribute}
            feedback={fb}
            isRevealing={isNew}
            delay={i * 100}
          />
        ))}
      </div>
    </div>
  );
}
