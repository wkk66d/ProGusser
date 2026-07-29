// ============================================================
// Target Selection — Seeded PRNG for fair P2P target picking
// Uses the Alea PRNG algorithm for deterministic shuffling
// ============================================================

import type { Player } from '../types/game';

/**
 * Alea PRNG — seedable random number generator.
 * Returns a function that produces numbers in [0, 1).
 */
function alea(seed: string): () => number {
  // Simple hash-based PRNG using cyrb53 hash as seed
  let h = cyrb53(seed);
  return () => {
    // Mulberry32 PRNG
    h |= 0;
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * cyrb53 hash — fast string hash producing a 53-bit integer.
 */
function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/**
 * Fisher-Yates shuffle using a seeded PRNG.
 */
function seededShuffle<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generate a random nonce for shared seed protocol.
 * Uses crypto.randomUUID() for true randomness.
 */
export function generateNonce(): string {
  return crypto.randomUUID();
}

/**
 * Combine two nonces into a deterministic seed.
 * Nonces are sorted alphabetically to ensure both peers get the same result.
 */
export function combineNonces(nonceA: string, nonceB: string): string {
  const sorted = [nonceA, nonceB].sort();
  return `${sorted[0]}:${sorted[1]}`;
}

/**
 * Select a target player from the pool using a combined seed.
 * Uses deterministic shuffling — same seed + same pool = same target.
 */
export function selectTarget(seed: string, pool: Player[]): Player {
  const rng = alea(seed);
  const shuffled = seededShuffle(pool, rng);
  return shuffled[0];
}

/**
 * Verify that the combined nonces produce the expected target.
 * Used for post-round verification.
 */
export function verifyTarget(nonceA: string, nonceB: string, pool: Player[], expectedTargetId: string): boolean {
  const seed = combineNonces(nonceA, nonceB);
  const target = selectTarget(seed, pool);
  return target.id === expectedTargetId;
}
