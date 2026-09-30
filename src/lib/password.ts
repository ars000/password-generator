export type PasswordOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  digits: boolean;
  symbols: boolean;
};

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';

/** Без кавычек, слэшей, HTML/URL-проблемных и «программных» символов; без пробела */
export const SAFE_SYMBOL_CHARSET = '!@*()-_=+[]{}?';
const SYMBOLS = SAFE_SYMBOL_CHARSET;

export const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  digits: true,
  symbols: true,
};

function getRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0]! % max;
}

function pickRandom(charset: string): string {
  return charset[getRandomInt(charset.length)]!;
}

function shuffle(chars: string[]): void {
  for (let i = chars.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j]!, chars[i]!];
  }
}

export function validateOptions(options: PasswordOptions): {
  ok: boolean;
  message?: string;
} {
  if (options.length < 8 || options.length > 128) {
    return { ok: false, message: 'Длина должна быть от 8 до 128 символов' };
  }
  if (
    !options.uppercase &&
    !options.lowercase &&
    !options.digits &&
    !options.symbols
  ) {
    return { ok: false, message: 'Выберите хотя бы один набор символов' };
  }

  const requiredClasses = [
    options.uppercase,
    options.lowercase,
    options.digits,
    options.symbols,
  ].filter(Boolean).length;

  if (options.length < requiredClasses) {
    return {
      ok: false,
      message: 'Увеличьте длину или отключите часть наборов символов',
    };
  }

  return { ok: true };
}

export function generatePassword(options: PasswordOptions): string {
  const validation = validateOptions(options);
  if (!validation.ok) {
    throw new Error(validation.message);
  }

  const pools: string[] = [];
  if (options.uppercase) pools.push(UPPER);
  if (options.lowercase) pools.push(LOWER);
  if (options.digits) pools.push(DIGITS);
  if (options.symbols) pools.push(SYMBOLS);

  const charset = pools.join('');
  const chars: string[] = [];

  for (const pool of pools) {
    chars.push(pickRandom(pool));
  }

  while (chars.length < options.length) {
    chars.push(pickRandom(charset));
  }

  shuffle(chars);
  return chars.join('');
}
