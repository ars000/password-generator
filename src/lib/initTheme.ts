import { applyTheme, resolveInitialTheme } from './theme';

/** Синхронная установка темы до монтирования React (см. index.html). */
export function initThemeOnDocument(): void {
  applyTheme(resolveInitialTheme());
}
