import { describe, expect, it } from 'vitest';
import { estimateStrength } from './strength';

describe('estimateStrength', () => {
  it('returns null for empty string', () => {
    expect(estimateStrength('')).toBeNull();
  });

  it('rates short digits-only password as weak', () => {
    const result = estimateStrength('12345678');
    expect(result).not.toBeNull();
    expect(result!.level).toBe('weak');
    expect(result!.label).toBe('Слабый');
  });

  it('rates longer mixed password higher than short digits', () => {
    const shortDigits = estimateStrength('12345678');
    const mixed = estimateStrength('abcdEFGH1234!@');
    expect(mixed!.score).toBeGreaterThan(shortDigits!.score);
    expect(mixed!.level).not.toBe('weak');
  });
});
