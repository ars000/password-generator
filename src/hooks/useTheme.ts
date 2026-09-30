import { useCallback, useEffect, useState } from 'react';
import {
  applyTheme,
  persistTheme,
  readStoredTheme,
  resolveInitialTheme,
  type Theme,
} from '../lib/theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => resolveInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (readStoredTheme() === null) {
        setTheme(media.matches ? 'dark' : 'light');
      }
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'light' ? 'dark' : 'light';
      persistTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
