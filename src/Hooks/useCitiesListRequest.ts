import {useEffect, useState} from "react";
import citiesData from "./data.json";

export const useCitiesListRequest = (cityName: string) => {
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cityNameToFilter = cityName.trim().toLowerCase();

  useEffect(() => {
    if (cityName.length > 0) {
      setIsLoading(true);

      setTimeout(() => {
        const filteredCities = citiesData.filter(city =>
          city[0].toString().toLowerCase().includes(cityNameToFilter),
        );

        const filteredCitiesNames = filteredCities.map(city =>
          city[0].toString(),
        );

        // Simulating that the endpoint will not return more than 5 cities
        const first10Cities = filteredCitiesNames.slice(0, 5);
        setCities(first10Cities);

        setIsLoading(false);
      }, 1000);
    }
  }, [cityName]);

  const reset = () => {
    setCities([]);
  };

  return {
    data: cities,
    isLoading,
    reset,
  };
};
