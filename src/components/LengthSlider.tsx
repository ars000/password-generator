type LengthSliderProps = {
  length: number;
  onChange: (length: number) => void;
};

export function LengthSlider({ length, onChange }: LengthSliderProps) {
  return (
    <div>
      <label className="field-label" htmlFor="password-length">
        Длина
      </label>
      <div className="length-control">
        <input
          id="password-length"
          type="range"
          min={8}
          max={128}
          value={length}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <span className="length-value">{length}</span>
      </div>
    </div>
  );
}
