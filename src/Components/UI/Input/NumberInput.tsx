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
}

export const NumberInput = ({
  name,
  label,
  value,
  onChange,
  hasError,
  errorMessage,
}: InputProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onChange(parseInt(event.target.value));
  };

  const decrementOrIncrement = (value: number, increment?: boolean) => {
    if (increment) {
      onChange(value + 1);
    } else {
      onChange(value - 1);
    }
  };

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <NumberInputWrapper $hasError={hasError}>
        <ChangeNumberValueButton onClick={() => decrementOrIncrement(value)}>
          -
        </ChangeNumberValueButton>
        <NumberInputElement
          name={name}
          type="number"
          value={value}
          onChange={onChangeHandler}
          id={name}
        />
        <ChangeNumberValueButton
          onClick={() => decrementOrIncrement(value, true)}>
          +
        </ChangeNumberValueButton>
      </NumberInputWrapper>
      {hasError ? (
        <ErrorMessage role="alert">{errorMessage}</ErrorMessage>
      ) : null}
    </>
  );
};
