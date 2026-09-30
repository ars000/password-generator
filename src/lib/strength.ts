import { SAFE_SYMBOL_CHARSET } from './password';

export type StrengthLevel = 'weak' | 'fair' | 'good' | 'strong';

export type StrengthResult = {
  level: StrengthLevel;
  label: string;
  score: number;
};

const HAS_UPPER = /[A-Z]/;
const HAS_LOWER = /[a-z]/;
const HAS_DIGIT = /[0-9]/;
const HAS_SYMBOL = /[^A-Za-z0-9]/;

function countClasses(password: string): number {
  let count = 0;
  if (HAS_UPPER.test(password)) count++;
  if (HAS_LOWER.test(password)) count++;
  if (HAS_DIGIT.test(password)) count++;
  if (HAS_SYMBOL.test(password)) count++;
  return count;
}

function poolSizeFromPassword(password: string): number {
  let size = 0;
  if (HAS_UPPER.test(password)) size += 26;
  if (HAS_LOWER.test(password)) size += 26;
  if (HAS_DIGIT.test(password)) size += 10;
  if (HAS_SYMBOL.test(password)) size += SAFE_SYMBOL_CHARSET.length;
  return size || 1;
}

export function estimateStrength(password: string): StrengthResult | null {
  if (!password) return null;

  const length = password.length;
  const classes = countClasses(password);
  const pool = poolSizeFromPassword(password);
  const entropy = length * Math.log2(pool);

  let score = Math.min(100, Math.round((entropy / 80) * 100));

  if (length >= 12) score += 5;
  if (length >= 16) score += 10;
  if (classes >= 4) score += 10;
  if (length < 8) score -= 25;
  if (classes === 1) score -= 20;

  score = Math.max(0, Math.min(100, score));

  if (score < 30) {
    return { level: 'weak', label: 'Слабый', score };
  }
  if (score < 55) {
    return { level: 'fair', label: 'Средний', score };
  }
  if (score < 80) {
    return { level: 'good', label: 'Хороший', score };
  }
  return { level: 'strong', label: 'Надёжный', score };
}
