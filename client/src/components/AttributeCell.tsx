import type { AttributeFeedback } from '../types/game';

const COLOR_CLASSES: Record<string, string> = {
  green: 'bg-feedback-green/20 border-feedback-green text-feedback-green',
  yellow: 'bg-feedback-yellow/20 border-feedback-yellow text-feedback-yellow',
  gray: 'bg-surface-800 border-surface-600 text-surface-400',
};

export function AttributeCell({ feedback, isRevealing, delay }: {
  feedback: AttributeFeedback;
  isRevealing: boolean;
  delay: number;
}) {
  const { color, value, arrow } = feedback;

  // Format the display value
  let display = String(value);
  if (feedback.attribute === 'country') {
    display = display.toUpperCase();
  }

  return (
    <div
      className={`
        flex flex-col items-center justify-center px-2 py-2 rounded-lg border min-w-[72px] h-[56px]
        ${COLOR_CLASSES[color]}
        ${isRevealing ? 'flip-cell' : ''}
        transition-all duration-200
      `}
      style={{ animationDelay: isRevealing ? `${delay}ms` : '0ms' }}
    >
      <span className="text-xs font-semibold leading-tight text-center">
        {display}
        {arrow && (
          <span className="ml-0.5 text-sm">{arrow === 'up' ? '↑' : '↓'}</span>
        )}
      </span>
    </div>
  );
}

export function ColorDot({ color }: { color: 'green' | 'yellow' | 'gray' }) {
  const COLORS = {
    green: 'bg-feedback-green shadow-[0_0_6px_rgba(83,141,78,0.5)]',
    yellow: 'bg-feedback-yellow shadow-[0_0_6px_rgba(181,159,59,0.5)]',
    gray: 'bg-surface-600',
  };

  return (
    <div
      className={`w-6 h-6 rounded-md ${COLORS[color]} transition-all duration-300`}
    />
  );
}
