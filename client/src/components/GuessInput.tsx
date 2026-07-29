import { useState, useRef, useEffect } from 'react';
import { PLAYERS } from '../data/players';
import type { Player } from '../types/game';
import { submitGuess } from '../p2p/connection';
import { useGameStore } from '../stores/gameStore';

export function GuessInput() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const remaining = useGameStore((s) => 8 - s.yourGuesses.length);
  const phase = useGameStore((s) => s.phase);

  // Filter players
  const filtered = query.length > 0
    ? PLAYERS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSubmit = (player: Player) => {
    submitGuess(player.name);
    setQuery('');
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < filtered.length) {
        handleSubmit(filtered[selectedIndex]);
      } else if (filtered.length === 1) {
        handleSubmit(filtered[0]);
      }
    } else if (e.key === 'Escape') {
      setQuery('');
      setFocused(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (phase !== 'playing') return null;

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            onKeyDown={handleKeyDown}
            placeholder={`Search players... (${remaining} guesses left)`}
            disabled={remaining <= 0}
            className="w-full py-3 px-4 bg-surface-800 border border-surface-600 rounded-xl text-white text-sm placeholder:text-surface-500 focus:outline-none focus:border-feedback-green disabled:opacity-50 transition-colors"
          />
        </div>
        <button
          onClick={() => {
            const match = PLAYERS.find((p) => p.name.toLowerCase() === query.toLowerCase());
            if (match) handleSubmit(match);
          }}
          disabled={remaining <= 0}
          className="px-6 py-3 bg-feedback-green hover:bg-feedback-green/80 disabled:bg-surface-700 disabled:text-surface-500 text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98]"
        >
          Submit
        </button>
      </div>

      {/* Dropdown */}
      {focused && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface-800 border border-surface-600 rounded-xl overflow-hidden z-10 shadow-2xl">
          {filtered.map((player, i) => (
            <button
              key={player.id}
              onMouseDown={() => handleSubmit(player)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-surface-700 transition-colors ${
                i === selectedIndex ? 'bg-surface-700' : ''
              }`}
            >
              <span className="text-sm font-semibold text-white">{player.name}</span>
              <span className="text-xs text-surface-400">{player.team}</span>
              <span className="text-xs text-surface-500 ml-auto">{player.country} · {player.position}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
