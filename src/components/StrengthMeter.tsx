import { estimateStrength } from '../lib/strength';

type StrengthMeterProps = {
  password: string;
  optionsValid: boolean;
};

export function StrengthMeter({ password, optionsValid }: StrengthMeterProps) {
  if (!optionsValid) {
    return (
      <div className="strength">
        <p className="strength__hint">Выберите хотя бы один набор символов</p>
      </div>
    );
  }

  const result = estimateStrength(password);

  if (!result) {
    return null;
  }

  return (
    <div className="strength">
      <div className="strength__header">
        <span className="strength__label">Надёжность</span>
        <span className="strength__value">{result.label}</span>
      </div>
      <div
        className="strength__track"
        role="meter"
        aria-label="Надёжность пароля"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={result.score}
      >
        <div
          className={`strength__fill strength__fill--${result.level}`}
          style={{ width: `${result.score}%` }}
        />
      </div>
    </div>
  );
}
