import {ReactComponent as DeleteIcon} from "../../../Assets/Icons/DeleteIcon.svg";
import {ReactComponent as LoadingSpinIcon} from "../../../Assets/Icons/Loading.svg";

import {
  Input,
  Label,
  ErrorMessage,
  InputWrapper,
  List,
  ListItem,
  DeleteButton,
  LoadingWrapper,
} from "./Input.style";

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  errorMessage?: string;
  resultList: string[];
  isLoading: boolean;
}

export function AutocompleteInput({
  name,
  value,
  onChange,
  label,
  hasError,
  errorMessage,
  resultList,
  isLoading = false,
}: InputProps) {
  return (
    <InputWrapper>
      <Label htmlFor={name}>{label}</Label>
      <Input value={value} onChange={onChange} id={name} name={name} />
      {value.length > 0 && !isLoading ? (
        <DeleteButton aria-label="Clear input" type="button">
          <DeleteIcon />
        </DeleteButton>
      ) : null}
      {isLoading && (
        <LoadingWrapper aria-label="Loading">
          <LoadingSpinIcon />
        </LoadingWrapper>
      )}
      {resultList.length > 0 ? (
        <List role="listbox" tabIndex={-1}>
          {resultList.map((item, index) => (
            <ListItem role="option" key={`${item}_${index}`} tabIndex={0}>
              {item}
            </ListItem>
          ))}
        </List>
      ) : null}
      {hasError ? (
        <ErrorMessage role="alert">{errorMessage}</ErrorMessage>
      ) : null}
    </InputWrapper>
  );
}
