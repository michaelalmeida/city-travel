import {useState} from "react";
import {DateInput, NumberInput} from "../../Components/UI";
import {useTranslation} from "react-i18next";
import {
  Form,
  MainSearchFieldsWrapper,
  SecondaryFieldsWrapper,
} from "./SearchForm.style";
import {TimelineWrapper} from "../Timeline/Timeline.style";
import {TimelineItem} from "../Timeline/TimelineItem";
import {AutocompleteWithRequest} from "./AutocompleteWithRequest";

export const SearchForm = () => {
  const {t} = useTranslation();
  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState(new Date());
  const [cities, setCities] = useState([
    {
      name: "originCity",
      label: t("form.originCity"),
      errorMessage: t("form.originCity.error"),
      hasError: false,
      resultList: [],
      value: "",
    },
    {
      name: "destinationCity",
      label: t("form.destinationCity"),
      errorMessage: t("form.destinationCity.error"),
      hasError: false,
      value: "",
    },
  ]);

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = event.target.value;

    const newCities = [...cities];
    newCities[index].value = value;
    setCities(newCities);
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
  };

  const onItemSelect = (item: string, index: number) => {
    const newCities = [...cities];
    newCities[index].value = item;
    setCities(newCities);
  };

  return (
    <Form onSubmit={onSubmit}>
      <MainSearchFieldsWrapper>
        <TimelineWrapper>
          {cities.map(({name, value, hasError, label}, index) => (
            <TimelineItem key={index} lastItem={cities.length === index + 1}>
              <AutocompleteWithRequest
                name={name}
                value={value}
                onChange={event => inputHandler(event, index)}
                label={label}
                clearInput={() => onClearInput(index)}
                hasError={hasError}
                index={index}
                isLoading={false}
                onItemSelect={onItemSelect}
              />
            </TimelineItem>
          ))}
        </TimelineWrapper>
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
        <DateInput
          name="date"
          label={t("form.date")}
          startDate={date}
          onChange={date => {
            setDate(date);
          }}
        />
      </SecondaryFieldsWrapper>
    </Form>
  );
};
