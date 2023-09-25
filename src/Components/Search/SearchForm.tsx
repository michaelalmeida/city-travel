import {useCallback, useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {DateInput, NumberInput} from "../../Components/UI";
import {useTranslation} from "react-i18next";
import {
  Form,
  MainSearchFieldsWrapper,
  SecondaryFieldsWrapper,
  AdditionalTimelineInfo,
  InputsWrapper,
  SubmitWrapper,
} from "./SearchForm.style";
import {TimelineWrapper} from "../Timeline/Timeline.style";
import {TimelineItem} from "../Timeline/TimelineItem";
import {AutocompleteWithRequest} from "./AutocompleteWithRequest";
import {ReactComponent as AddIcon} from "../../Assets/Icons/AddCircle.svg";
import {Button, LinkButton} from "../UI/Button";

interface ICity {
  index: number;
  name: string;
  label: string;
  errorMessage: string;
  hasError: boolean;
  value: string;
  removable: boolean;
}

export const SearchForm = () => {
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState(new Date());
  const [cities, setCities] = useState<ICity[]>([
    {
      index: 0,
      name: "originCity",
      label: t("form.originCity"),
      errorMessage: t("form.originCity.error"),
      hasError: false,
      value: "",
      removable: false,
    },
    {
      index: 1,
      name: "destinationCity",
      label: t("form.destinationCity"),
      errorMessage: t("form.destinationCity.error"),
      hasError: false,
      value: "",
      removable: false,
    },
  ]);
  const [nextIndex, setNextIndex] = useState(cities.length);

  useEffect(() => {
    const passangers = searchParams.get("passengers");
    const date = searchParams.get("date");
    const cities = searchParams.get("cities");

    if (passangers) {
      setPassengers(parseInt(passangers));
    }
    if (date) {
      setDate(new Date(date));
    }
    if (cities) {
      const newCities = JSON.parse(cities).map(
        (city: ICity, index: number) => ({
          index,
          label: index === 0 ? t("form.originCity") : t("form.destinationCity"),
          errorMessage:
            index === 0
              ? t("form.originCity.error")
              : t("form.destinationCity.error"),
          hasError: false,
          value: city.value,
        }),
      );

      setNextIndex(newCities.length);
      setCities(newCities);
    }
  }, []);

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
    newCities[index].hasError = true;
    setCities(newCities);
  };

  const updateSearchParams = useCallback(() => {
    const newSearchParams = new URLSearchParams();

    const citiesToStore = cities.map(city => ({
      name: city.name,
      value: city.value,
    }));
    newSearchParams.append("cities", JSON.stringify(citiesToStore));
    newSearchParams.append("passengers", passengers.toString());
    newSearchParams.append("date", date.toISOString());

    setSearchParams(newSearchParams);
  }, [cities, passengers, date, setSearchParams]);

  useEffect(() => {
    updateSearchParams();
  }, [updateSearchParams]);

  const inputNumberHandler = (value: number) => {
    setPassengers(value);
  };

  const onItemSelect = (item: string, index: number) => {
    const newCities = [...cities];
    newCities[index].value = item;
    newCities[index].hasError = false;
    setCities(newCities);
  };

  const addCityHandler = () => {
    const newCities = [...cities];
    const newIndex = nextIndex;

    setNextIndex(nextIndex + 1);
    newCities.push({
      index: newIndex,
      name: `destinationCity${newIndex}`,
      label: t("form.destinationCity"),
      errorMessage: t("form.destinationCity.error"),
      hasError: false,
      value: "",
      removable: true,
    });
    setCities(newCities);
  };

  const removeItemHandler = (index: number) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities(newCities);
  };

  const isTheItemRemovable = (index: number) => {
    if (cities.length > 2 && index === 1) {
      return true;
    }
    if (index > 1 && cities.length > 2) {
      return true;
    }
  };

  const validateCities = useCallback(() => {
    const newCities = [...cities];

    newCities.forEach(city => {
      if (city.value.length === 0) {
        city.hasError = true;
      } else {
        city.hasError = false;
      }
    });

    setCities(newCities);
  }, [cities]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateCities();
  };

  const shouldSubmitButtonBeDisabled = useMemo(() => {
    return cities.some(
      city => city.hasError || city.value.length === 0 || passengers < 1,
    );
  }, [cities]);

  return (
    <Form onSubmit={onSubmit}>
      <InputsWrapper>
        <MainSearchFieldsWrapper>
          <TimelineWrapper>
            {cities.map(
              (
                {name, value, hasError, label, removable, index, errorMessage},
                position,
              ) => (
                <TimelineItem
                  key={index}
                  lastItem={cities.length === position + 1}
                  removable={removable || isTheItemRemovable(position)}
                  onRemoveItem={() => removeItemHandler(position)}>
                  <AutocompleteWithRequest
                    name={name}
                    value={value}
                    onChange={event => inputHandler(event, index)}
                    label={label}
                    clearInput={() => onClearInput(position)}
                    hasError={hasError}
                    index={index}
                    isLoading={false}
                    onItemSelect={onItemSelect}
                    errorMessage={errorMessage}
                  />
                </TimelineItem>
              ),
            )}
            <AdditionalTimelineInfo>
              <div>
                <AddIcon />
              </div>
              <div>
                <LinkButton onClick={addCityHandler}>
                  {t("form.addDestination")}
                </LinkButton>
              </div>
            </AdditionalTimelineInfo>
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
      </InputsWrapper>
      <SubmitWrapper>
        <Button type="submit" disabled={shouldSubmitButtonBeDisabled}>
          {t("app.submit")}
        </Button>
      </SubmitWrapper>
    </Form>
  );
};
