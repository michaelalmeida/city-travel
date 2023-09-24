import {useMemo, useState} from "react";
import {AutocompleteInput, NumberInput} from "../../Components/UI";
import {useTranslation} from "react-i18next";
import {useCitiesListRequest} from "../../Hooks/useCitiesListRequest";
import debounce from "lodash.debounce";
import {
  Form,
  MainSearchFieldsWrapper,
  SecondaryFieldsWrapper,
} from "./SearchForm.style";

export const SearchForm = () => {
  const {t} = useTranslation();
  const [currentCitySearch, setCurrentCitySearch] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cities, setCities] = useState([
    {
      name: "originCity",
      label: t("form.originCity"),
      errorMessage: t("form.originCity.error"),
      hasError: false,
      isLoading: false,
      resultList: [],
      value: "",
    },
    {
      name: "destinationCity",
      label: t("form.destinationCity"),
      errorMessage: t("form.destinationCity.error"),
      hasError: false,
      isLoading: false,
      resultList: [],
      value: "",
    },
  ]);

  const {data, isLoading, reset} = useCitiesListRequest(currentCitySearch);

  const debounceSetCityName = useMemo(
    () =>
      debounce((value: string) => {
        setCurrentCitySearch(value);
      }, 500),
    [],
  );

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = event.target.value;
    reset();

    const newCities = [...cities];
    newCities[index].value = value;
    setCities(newCities);
    debounceSetCityName(value);
  };

  const onClearInput = (index: number) => {
    const newCities = [...cities];
    newCities[index].value = "";
    setCities(newCities);
  };

  const inputNumberHandler = (value: number) => {
    setPassengers(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <Form onSubmit={onSubmit}>
      <MainSearchFieldsWrapper>
        {cities.map(
          ({name, value, hasError, label, isLoading, resultList}, index) => (
            <AutocompleteInput
              key={index}
              name={name}
              value={value}
              onChange={event => inputHandler(event, index)}
              label={label}
              resultList={resultList}
              isLoading={isLoading}
              clearInput={() => onClearInput(index)}
              hasError={hasError}
            />
          ),
        )}
      </MainSearchFieldsWrapper>
      <SecondaryFieldsWrapper>
        <NumberInput
          name="passengers"
          value={passengers}
          onChange={inputNumberHandler}
          errorMessage={t("form.passengers.error")}
          hasError={passengers < 1}
          label={t("form.passengers")}
        />
      </SecondaryFieldsWrapper>
    </Form>
  );
};
