import { describe, expect, it } from 'vitest';
import {
  DEFAULT_OPTIONS,
  generatePassword,
  validateOptions,
  type PasswordOptions,
} from './password';

const UPPER = /[A-Z]/;
const LOWER = /[a-z]/;
const DIGIT = /[0-9]/;
const SYMBOL = /[^A-Za-z0-9]/;

describe('validateOptions', () => {
  it('accepts default options', () => {
    expect(validateOptions(DEFAULT_OPTIONS).ok).toBe(true);
  });

  it('rejects length below 8', () => {
    const result = validateOptions({ ...DEFAULT_OPTIONS, length: 7 });
    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/8/);
  });

  it('rejects when no charset selected', () => {
    const result = validateOptions({
      length: 16,
      uppercase: false,
      lowercase: false,
      digits: false,
      symbols: false,
    });
    expect(result.ok).toBe(false);
  });

  it('rejects when length is less than enabled charset count', () => {
    const result = validateOptions({
      length: 2,
      uppercase: true,
      lowercase: true,
      digits: true,
      symbols: true,
    });
    expect(result.ok).toBe(false);
  });
});

describe('generatePassword', () => {
  it('returns password of requested length', () => {
    const options: PasswordOptions = { ...DEFAULT_OPTIONS, length: 24 };
    expect(generatePassword(options)).toHaveLength(24);
  });

  it('includes at least one char from each enabled class', () => {
    const password = generatePassword(DEFAULT_OPTIONS);
    expect(UPPER.test(password)).toBe(true);
    expect(LOWER.test(password)).toBe(true);
    expect(DIGIT.test(password)).toBe(true);
    expect(SYMBOL.test(password)).toBe(true);
  });

  it('throws when options invalid', () => {
    expect(() =>
      generatePassword({
        length: 16,
        uppercase: false,
        lowercase: false,
        digits: false,
        symbols: false,
      }),
    ).toThrow();
  });
});
