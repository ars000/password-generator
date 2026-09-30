type GenerateButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export function GenerateButton({ disabled, onClick }: GenerateButtonProps) {
  return (
    <button
      type="button"
      className="btn btn--primary"
      disabled={disabled}
      onClick={onClick}
    >
      Сгенерировать
    </button>
  );
}
