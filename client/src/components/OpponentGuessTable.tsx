import { useGameStore } from '../stores/gameStore';
import { ColorDot } from './AttributeCell';

const COLUMN_LABELS = ['国家', '战队', '年龄', 'Major', '位置', 'Top排名'];

export function OpponentGuessTable({ peerId, compact }: { peerId: string; compact?: boolean }) {
  const rows = useGameStore((s) => s.opponentGuessMap[peerId]) || [];

  return (
    <div className="space-y-0.5">
      {/* Header */}
      <div className="flex items-center gap-1 mb-0.5">
        <div className="w-4 text-[10px] text-surface-500 text-right font-mono shrink-0">#</div>
        <div className="flex-1 flex items-center justify-center gap-1.5">
          {COLUMN_LABELS.map((label) => (
            <div
              key={label}
              className={`text-center text-[9px] text-surface-500 font-medium leading-tight ${
                compact ? 'w-5' : 'w-7'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Color-only rows */}
      {rows.map((row) => (
        <div key={row.guessIndex} className="flex items-center gap-1 animate-in fade-in duration-200">
          <div className="w-4 text-[10px] text-surface-500 text-right font-mono shrink-0">
            {row.guessIndex}
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5">
            {row.colors.map((color, i) => (
              <ColorDot key={i} color={color} />
            ))}
          </div>
        </div>
      ))}

      {/* Empty rows */}
      {Array.from({ length: Math.max(0, 8 - rows.length) }).map((_, i) => (
        <div key={`empty-${i}`} className="flex items-center gap-1 opacity-15">
          <div className="w-4 text-[10px] text-surface-500 text-right font-mono shrink-0">
            {rows.length + i + 1}
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5">
            {Array.from({ length: 6 }).map((_, j) => (
              <div key={j} className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} rounded-sm bg-surface-800 border border-surface-700`} />
            ))}
          </div>
        </div>
      ))}

      {rows.length === 0 && (
        <div className="text-center py-1 text-[10px] text-surface-600">
          等待猜测...
        </div>
      )}
    </div>
  );
}
