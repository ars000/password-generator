type PasswordDisplayProps = {
  password: string;
  onCopy: () => void;
  copyDisabled: boolean;
  copyStatus: 'idle' | 'copied' | 'failed';
};

const COPY_MESSAGES = {
  idle: '\u00a0',
  copied: 'Скопировано',
  failed: 'Не удалось скопировать',
} as const;

export function PasswordDisplay({
  password,
  onCopy,
  copyDisabled,
  copyStatus,
}: PasswordDisplayProps) {
  const statusClass =
    copyStatus === 'copied'
      ? 'copy-status--ok'
      : copyStatus === 'failed'
        ? 'copy-status--error'
        : '';

  return (
    <div>
      <label className="field-label" htmlFor="generated-password">
        Пароль
      </label>
      <div className="password-row">
        <input
          id="generated-password"
          className="password-input"
          type="text"
          readOnly
          value={password}
          autoComplete="off"
          onFocus={(e) => e.target.select()}
          onClick={(e) => e.currentTarget.select()}
          aria-label="Сгенерированный пароль"
        />
        <button
          type="button"
          className="btn btn--secondary"
          onClick={onCopy}
          disabled={copyDisabled}
        >
          Копировать
        </button>
      </div>
      <p className={`copy-status ${statusClass}`} aria-live="polite">
        {COPY_MESSAGES[copyStatus]}
      </p>
    </div>
  );
}
