// ============================================================
// ProGusser — CS2 Player Guessing Game
// Shared type definitions for client and signaling server
// ============================================================

// --- Player Data ---

export type Position = 'Rifler' | 'AWPer' | 'IGL' | 'Coach' | 'Caster';

export interface Player {
  id: string;
  name: string;
  country: string;           // ISO 3166-1 alpha-2
  team: string;              // Current team name, "(Retired)", "(Free Agent)", or "(Caster)"
  teamNationality: string | null;  // null = international team
  age: number;
  majorCount: number;
  position: Position;
  topRanking: number;        // 1-20 for Top 20, 21 for ">20"
}

// --- Feedback ---

export type FeedbackColor = 'green' | 'yellow' | 'gray';

export interface AttributeFeedback {
  attribute: string;         // key of Player used for display
  label: string;             // Display label (e.g., "Country", "Age")
  value: string | number;    // Display value
  color: FeedbackColor;
  arrow?: 'up' | 'down';     // only for age, majorCount, topRanking (yellow)
}

export interface GuessResult {
  player: Player;
  feedback: AttributeFeedback[];
  guessNumber: number;
  timestamp: number;
}

// --- Game State ---

export type GamePhase =
  | 'idle'
  | 'lobby'
  | 'setup'
  | 'connecting'
  | 'playing'
  | 'round_end'
  | 'match_end';

export interface OpponentGuessRow {
  guessIndex: number;
  colors: FeedbackColor[];   // [Country, Team, Age, Major, Position, Top]
  timestamp: number;
}

export interface RoundState {
  phase: GamePhase;
  targetPlayer: Player | null;
  yourGuesses: GuessResult[];
  opponentGuessRows: OpponentGuessRow[];
  yourGuessCount: number;
  opponentGuessCount: number;
  timeRemaining: number;     // seconds
  winner: 'you' | 'opponent' | 'draw' | null;
}

export interface MatchConfig {
  format: number;            // BO1=1, BO3=3, BO5=5, BO7=7
  currentRound: number;
  scores: [number, number];  // [yourScore, opponentScore]
}

// --- P2P Signaling ---

export interface SignalingMessage {
  type: 'create' | 'join' | 'signal' | 'room_created' | 'room_joined' | 'peer_joined' | 'error';
  room?: string;
  data?: unknown;
  message?: string;
}

// --- WebRTC DataChannel Messages ---

export type GameMessage =
  | { type: 'MATCH_CONFIG'; format: number }
  | { type: 'MATCH_CONFIG_ACK' }
  | { type: 'ROUND_START'; nonceA: string }
  | { type: 'ROUND_START_ACK'; nonceB: string }
  | { type: 'GUESS'; guessIndex: number; colors: FeedbackColor[] }
  | { type: 'CORRECT_GUESS'; guessIndex: number }
  | { type: 'GUESSES_EXHAUSTED' }
  | { type: 'TIME_UP' }
  | { type: 'ROUND_OVER'; nonceReveal: string }
  | { type: 'MATCH_OVER' }
  | { type: 'REMATCH' }
  | { type: 'DISCONNECT' };
