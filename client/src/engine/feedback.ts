// ============================================================
// Feedback Engine — computes green/yellow/gray + arrows
// for comparing a guessed player against the target player
// ============================================================

import type { Player, AttributeFeedback, FeedbackColor } from '../types/game';
import { isSameContinentGroup, getChineseCountryName } from './regions';

/**
 * Compute feedback for a guess compared to the target player.
 * Returns 6 AttributeFeedback entries: Country, Team, Age, MajorCount, Position, TopRanking.
 */
export function computeFeedback(guess: Player, target: Player): AttributeFeedback[] {
  return [
    evaluateCountry(guess, target),
    evaluateTeam(guess, target),
    evaluateAge(guess, target),
    evaluateMajorCount(guess, target),
    evaluatePosition(guess, target),
    evaluateTopRanking(guess, target),
  ];
}

// --- Individual attribute evaluators ---

function evaluateCountry(guess: Player, target: Player): AttributeFeedback {
  const same = guess.country === target.country;
  let color: FeedbackColor;
  if (same) {
    color = 'green';
  } else if (isSameContinentGroup(guess.country, target.country)) {
    color = 'yellow';
  } else {
    color = 'gray';
  }
  return {
    attribute: 'country',
    label: '国家',
    value: getChineseCountryName(guess.country),
    color,
  };
}

function evaluateTeam(guess: Player, target: Player): AttributeFeedback {
  // Same team = green (only case for green)
  if (guess.team === target.team) {
    return { attribute: 'team', label: '战队', value: guess.team, color: 'green' };
  }

  const gNat = guess.teamNationality;
  const tNat = target.teamNationality;

  // International teams can't be compared by continent
  if (gNat === null || tNat === null) {
    return { attribute: 'team', label: '战队', value: guess.team, color: 'gray' };
  }

  // Both have nationalities — compare using country continent rules
  if (isSameContinentGroup(gNat, tNat)) {
    return { attribute: 'team', label: '战队', value: guess.team, color: 'yellow' };
  }

  return { attribute: 'team', label: '战队', value: guess.team, color: 'gray' };
}

function evaluateAge(guess: Player, target: Player): AttributeFeedback {
  const delta = guess.age - target.age;
  return numericFeedback('age', '年龄', guess.age, delta, 3);
}

function evaluateMajorCount(guess: Player, target: Player): AttributeFeedback {
  const delta = guess.majorCount - target.majorCount;
  return numericFeedback('majorCount', 'Major', guess.majorCount, delta, 1);
}

function evaluatePosition(guess: Player, target: Player): AttributeFeedback {
  const same = guess.position === target.position;
  return {
    attribute: 'position',
    label: '位置',
    value: guess.position,
    color: same ? 'green' : 'gray',
    // No yellow for position
  };
}

function evaluateTopRanking(guess: Player, target: Player): AttributeFeedback {
  const g = guess.topRanking;
  const t = target.topRanking;
  const delta = g - t;
  const displayValue = guess.topRanking >= 21 ? '>20' : `#${guess.topRanking}`;
  return numericFeedback('topRanking', 'Top排名', displayValue, delta, 3);
}

// --- Helpers ---

const CLOSE_RANGE: Record<string, number> = {
  age: 3,
  majorCount: 1,
  topRanking: 3,
};

function numericFeedback(
  attr: string,
  label: string,
  displayValue: string | number,
  delta: number,   // guess - target
  closeRange: number,
): AttributeFeedback {
  if (delta === 0) {
    return { attribute: attr, label, value: displayValue, color: 'green' };
  }
  // Arrow direction: delta > 0 → guess value is higher → target is lower → ↓
  //                  delta < 0 → guess value is lower  → target is higher → ↑
  const arrow = delta > 0 ? 'down' : 'up';
  if (Math.abs(delta) <= closeRange) {
    return { attribute: attr, label, value: displayValue, color: 'yellow', arrow };
  }
  // Gray — still show arrow so player knows direction to target
  return { attribute: attr, label, value: displayValue, color: 'gray', arrow };
}

/**
 * Check if a guess correctly identifies the target (all green).
 */
export function isCorrectGuess(feedback: AttributeFeedback[]): boolean {
  return feedback.every(f => f.color === 'green');
}

/**
 * Score a guess for "closest guess" comparison when both fail.
 * Green = 2 points, Yellow = 1 point, Gray = 0.
 */
export function scoreGuess(feedback: AttributeFeedback[]): number {
  return feedback.reduce((acc, f) => {
    if (f.color === 'green') return acc + 2;
    if (f.color === 'yellow') return acc + 1;
    return acc;
  }, 0);
}
