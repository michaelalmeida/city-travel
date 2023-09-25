import {
  NumberInputWrapper,
  NumberInput as NumberInputElement,
  ErrorMessage,
  Label,
  ChangeNumberValueButton,
} from "./Input.style";

interface InputProps {
  name: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  hasError?: boolean;
  errorMessage?: string;
  min?: number;
}

export const NumberInput = ({
  name,
  label,
  value,
  onChange,
  hasError,
  errorMessage,
  min = 0,
}: InputProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onChange(parseInt(event.target.value));
  };

  const decrementOrIncrement = (value: number, increment?: boolean) => {
    if (increment) {
      onChange(value + 1);
    } else if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <NumberInputWrapper $hasError={hasError}>
        <ChangeNumberValueButton
          onClick={() => decrementOrIncrement(value)}
          type="button">
          -
        </ChangeNumberValueButton>
        <NumberInputElement
          name={name}
          type="number"
          value={value}
          onChange={onChangeHandler}
          id={name}
          min={min}
        />
        <ChangeNumberValueButton
          onClick={() => decrementOrIncrement(value, true)}
          type="button">
          +
        </ChangeNumberValueButton>
      </NumberInputWrapper>
      {hasError ? (
        <ErrorMessage role="alert">{errorMessage}</ErrorMessage>
      ) : null}
    </div>
  );
};
