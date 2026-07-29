// ============================================================
// ProGusser — CS2 Player Guessing Game
// Core type definitions shared across the client
// ============================================================

export type Position = 'Rifler' | 'AWPer' | 'IGL' | 'Coach' | 'Caster';

export interface Player {
  id: string;
  name: string;
  country: string;           // ISO 3166-1 alpha-2
  team: string;              // Current team name
  teamNationality: string | null; // null = international team
  age: number;
  majorCount: number;
  position: Position;
  topRanking: number;        // 1-20 for Top 20, 21 for ">20"
}

export type FeedbackColor = 'green' | 'yellow' | 'gray';

export interface AttributeFeedback {
  attribute: string;
  label: string;
  value: string | number;
  color: FeedbackColor;
  arrow?: 'up' | 'down';
}

export interface GuessResult {
  player: Player;
  feedback: AttributeFeedback[];
  guessNumber: number;
  timestamp: number;
}

export type GamePhase =
  | 'idle' | 'lobby' | 'setup' | 'connecting'
  | 'playing' | 'round_end' | 'match_end';

export interface OpponentGuessRow {
  guessIndex: number;
  colors: FeedbackColor[];
  timestamp: number;
}

// Per-opponent guess tracking: peerId → guesses
export type OpponentGuessMap = Record<string, OpponentGuessRow[]>;

export interface SignalingMessage {
  type: 'create' | 'join' | 'signal' | 'room_created' | 'room_joined'
    | 'peer_joined' | 'peer_left' | 'update_nickname' | 'error';
  room?: string;
  peerId?: string;
  nickname?: string;
  peers?: { peerId: string; nickname: string }[];
  data?: unknown;
  message?: string;
}

export type GameMessage =
  | { type: 'MATCH_CONFIG'; format: number }
  | { type: 'MATCH_CONFIG_ACK' }
  | { type: 'ROUND_START'; nonceA: string }
  | { type: 'ROUND_START_ACK'; nonceB: string }
  | { type: 'ROUND_TARGET'; seed: string }
  | { type: 'GUESS'; guessIndex: number; colors: FeedbackColor[] }
  | { type: 'CORRECT_GUESS'; guessIndex: number }
  | { type: 'GUESSES_EXHAUSTED' }
  | { type: 'TIME_UP' }
  | { type: 'ROUND_OVER'; nonceReveal: string }
  | { type: 'MATCH_OVER' }
  | { type: 'REMATCH' }
  | { type: 'DISCONNECT' };
