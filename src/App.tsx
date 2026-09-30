import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CharsetToggles } from './components/CharsetToggles';
import { GenerateButton } from './components/GenerateButton';
import { LengthSlider } from './components/LengthSlider';
import { PasswordDisplay } from './components/PasswordDisplay';
import { StrengthMeter } from './components/StrengthMeter';
import { ThemeToggle } from './components/ThemeToggle';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';
import { useTheme } from './hooks/useTheme';
import {
  DEFAULT_OPTIONS,
  generatePassword,
  validateOptions,
  type PasswordOptions,
} from './lib/password';

function createInitialPassword(): string {
  return generatePassword(DEFAULT_OPTIONS);
}

export default function App() {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState(createInitialPassword);
  const { copy, copyStatus } = useCopyToClipboard();
  const { theme, toggleTheme } = useTheme();
  const skipOptionsSync = useRef(true);

  const validation = useMemo(() => validateOptions(options), [options]);
  const canGenerate = validation.ok;

  useEffect(() => {
    if (skipOptionsSync.current) {
      skipOptionsSync.current = false;
      return;
    }
    if (!validation.ok) return;
    setPassword(generatePassword(options));
  }, [options, validation.ok]);

  const handleGenerate = useCallback(() => {
    if (!validation.ok) return;
    setPassword(generatePassword(options));
  }, [options, validation.ok]);

  const updateOptions = useCallback((patch: Partial<PasswordOptions>) => {
    setOptions((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleCopy = useCallback(() => {
    void copy(password);
  }, [copy, password]);

  return (
    <div className="app">
      <header className="app__header">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <h1 className="app__title">Генератор паролей</h1>
        <p className="app__subtitle">
          Настройте параметры и получите случайный пароль
        </p>
      </header>

      <div className="card">
        <div className="card__section">
          <PasswordDisplay
            password={password}
            onCopy={handleCopy}
            copyDisabled={!password}
            copyStatus={copyStatus}
          />
          <StrengthMeter password={password} optionsValid={canGenerate} />
        </div>

        <div className="card__section">
          <LengthSlider
            length={options.length}
            onChange={(length) => updateOptions({ length })}
          />
        </div>

        <div className="card__section">
          <CharsetToggles options={options} onChange={updateOptions} />
          {!validation.ok && validation.message ? (
            <p className="validation-msg" role="alert">
              {validation.message}
            </p>
          ) : null}
        </div>

        <div className="card__section">
          <GenerateButton disabled={!canGenerate} onClick={handleGenerate} />
        </div>
      </div>

      <p className="app__footer">
        Пароли создаются только в вашем браузере — ничего не отправляется на
        сервер
      </p>
    </div>
  );
}
