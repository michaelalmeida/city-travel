import {useCallback, useEffect, useMemo, useState} from "react";
import {useCalculateDistanceCitiesRequest} from "../../Hooks/useCalculateDistanceCitiesRequest";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Route} from "../../Constants/Routes";
import {useTranslation} from "react-i18next";

export interface ICity {
  index: number;
  name: string;
  label: string;
  errorMessage: string;
  hasError: boolean;
  value: string;
  removable: boolean;
}

export const useSearchForm = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {calculateDistances, isLoading, totalDistance, distances} =
    useCalculateDistanceCitiesRequest();

  const [searchParams, setSearchParams] = useSearchParams();
  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState(new Date());
  const [cities, setCities] = useState([
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

  const cityNames = cities.map(city => city.value.toLocaleLowerCase().trim());

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

  const shouldSubmitButtonBeDisabled = useMemo(() => {
    return cities.some(
      city => city.hasError || city.value.length === 0 || passengers < 1,
    );
  }, [cities]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateCities();

    if (!shouldSubmitButtonBeDisabled) {
      calculateDistances(cityNames);
    }
  };

  useEffect(() => {
    if (totalDistance !== 0 && distances.length !== 0 && !isLoading) {
      const params = new URLSearchParams();
      params.append("passengers", passengers.toString());
      params.append("total", totalDistance.toString());
      params.append("distances", JSON.stringify(distances));
      params.append("date", date.toISOString());
      params.append("cities", JSON.stringify(cityNames));

      navigate(`${Route.RESULT}?${params.toString()}`);
    }
  }, [totalDistance, distances, isLoading]);

  useEffect(() => {
    const passengersParam = searchParams.get("passengers");
    const date = searchParams.get("date");
    const cities = searchParams.get("cities");

    if (passengersParam) {
      setPassengers(parseInt(passengersParam));
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

  const onChangeDate = (date: Date) => {
    setDate(date);
  };

  return {
    onSubmit,
    shouldBeDisabled: shouldSubmitButtonBeDisabled || isLoading,
    isLoading,
    removeItemHandler,
    isTheItemRemovable,
    inputHandler,
    onClearInput,
    onItemSelect,
    addCityHandler,
    inputNumberHandler,
    cities,
    passengers,
    date,
    onChangeDate,
  };
};
