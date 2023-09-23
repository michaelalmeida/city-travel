import {useEffect, useState} from "react";
import citiesData from "./data.json";

export const useCitiesList = (city: string) => {
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cityNameToFilter = city.trim().toLowerCase();

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      if (city.length > 0) {
        const filteredCities = citiesData.filter(city =>
          city[0].toString().toLowerCase().includes(cityNameToFilter),
        );

        const filteredCitiesNames = filteredCities.map(city =>
          city[0].toString(),
        );

        setCities(filteredCitiesNames);
      }
      setIsLoading(false);
    }, 1000);
  }, [city]);

  return {
    cities,
    isLoading,
  };
};
