import {useState, useMemo} from "react";
import debounce from "lodash.debounce";

import {useCitiesListRequest} from "../../Hooks/useCitiesListRequest";
import {AutocompleteInput} from "../UI";

interface AutocompleteWithRequestProps {
  index: number;
  name: string;
  value: string;
  hasError?: boolean;
  label: string;
  isLoading: boolean;
  clearInput: (index: number) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onItemSelect: (item: string, index: number) => void;
  errorMessage?: string;
}
export const AutocompleteWithRequest = ({
  index,
  name,
  value,
  hasError,
  label,
  onChange,
  clearInput,
  onItemSelect,
  errorMessage,
}: AutocompleteWithRequestProps) => {
  const [currentCitySearch, setCurrentCitySearch] = useState("");
  const {data, isLoading, reset} = useCitiesListRequest(currentCitySearch);

  const debounceSetCityName = useMemo(
    () =>
      debounce((value: string) => {
        setCurrentCitySearch(value);
      }, 500),
    [],
  );

  const updateFieldHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    reset();
    debounceSetCityName(value);
    onChange(event, index);
  };

  const clearInputHandler = () => {
    clearInput(index);
    reset();
  };

  const onItemSelectHandler = (item: string, index: number) => {
    onItemSelect(item, index);
    reset();
  };

  return (
    <AutocompleteInput
      name={name}
      value={value}
      onChange={updateFieldHandler}
      label={label}
      resultList={data}
      isLoading={isLoading}
      clearInput={clearInputHandler}
      hasError={hasError}
      onItemSelect={value => onItemSelectHandler(value, index)}
      errorMessage={errorMessage}
    />
  );
};
