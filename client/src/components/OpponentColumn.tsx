import { useGameStore } from '../stores/gameStore';
import { ColorDot } from './AttributeCell';

const HEADERS = ['国家', '战队', '年龄', 'Major', '位置', 'Top'];

export function OpponentColumn({ peerId, nickname }: { peerId: string; nickname: string }) {
  const rows = useGameStore((s) => s.opponentGuessMap[peerId]) || [];

  return (
    <div className="flex-1 min-w-[120px] flex flex-col">
      {/* Column header */}
      <div className="text-center mb-1">
        <span className="text-[11px] font-semibold text-surface-300 block truncate">{nickname}</span>
        <span className="text-[9px] text-surface-500">{rows.length}/8</span>
      </div>

      {/* Attribute labels */}
      <div className="flex items-center justify-center gap-1 mb-0.5">
        <span className="w-3 shrink-0" />
        {HEADERS.map((h) => (
          <div key={h} className="w-5 text-center text-[8px] text-surface-500 leading-tight">
            {h}
          </div>
        ))}
      </div>

      {/* 8 guess rows — all same width as filled rows */}
      {Array.from({ length: 8 }).map((_, i) => {
        const row = rows[i];
        return (
          <div key={i} className="flex items-center justify-center gap-1 h-6">
            <span className="w-3 text-[9px] text-surface-600 text-right font-mono shrink-0">
              {i + 1}
            </span>
            {row ? (
              row.colors.map((color, j) => (
                <div key={j} className="w-5 flex items-center justify-center">
                  <div className="transform scale-75">
                    <ColorDot color={color} />
                  </div>
                </div>
              ))
            ) : (
              <>
                {HEADERS.map((_, j) => (
                  <div key={j} className="w-5 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-sm bg-surface-800/50 border border-surface-700/50" />
                  </div>
                ))}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
