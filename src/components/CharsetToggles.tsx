import type { PasswordOptions } from '../lib/password';

type CharsetTogglesProps = {
  options: PasswordOptions;
  onChange: (patch: Partial<PasswordOptions>) => void;
};

const CHARSET_ITEMS: {
  key: keyof Pick<
    PasswordOptions,
    'uppercase' | 'lowercase' | 'digits' | 'symbols'
  >;
  label: string;
  id: string;
}[] = [
  { key: 'uppercase', label: 'A–Z', id: 'charset-upper' },
  { key: 'lowercase', label: 'a–z', id: 'charset-lower' },
  { key: 'digits', label: '0–9', id: 'charset-digits' },
  { key: 'symbols', label: 'Символы', id: 'charset-symbols' },
];

export function CharsetToggles({ options, onChange }: CharsetTogglesProps) {
  return (
    <div>
      <span className="field-label">Наборы символов</span>
      <div className="charset-grid" role="group" aria-label="Наборы символов">
        {CHARSET_ITEMS.map(({ key, label, id }) => (
          <label key={key} className="toggle" htmlFor={id}>
            <input
              id={id}
              type="checkbox"
              checked={options[key]}
              onChange={(e) => onChange({ [key]: e.target.checked })}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
