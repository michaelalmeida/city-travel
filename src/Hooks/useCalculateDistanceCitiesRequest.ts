import {useState} from "react";
import citiesData from "./data.json";

const EARTH_RADIUS_KM = 6371;

function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const degToRad = (degree: number) => (degree * Math.PI) / 180;
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

export const useCalculateDistanceCitiesRequest = () => {
  const [distances, setDistances] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cityList, setCityList] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);

  const calculateDistances = (cities: string[]) => {
    setIsLoading(true);
    setCityList(cities);

    setTimeout(() => {
      let totalDistance = 0;
      const cityDistances: number[] = [];

      for (let i = 0; i < cities.length - 1; i++) {
        const city1 = cities[i];
        const city2 = cities[i + 1];

        if (
          city1 === "fail" ||
          city2 === "fail" ||
          city1 === "dijon" ||
          city2 === "dijon"
        ) {
          setHasError(true);
          break;
        }

        const city1Data = citiesData.find(
          data => data[0].toString().toLocaleLowerCase().trim() === city1,
        );
        const city2Data = citiesData.find(
          data => data[0].toString().toLocaleLowerCase().trim() === city2,
        );

        if (city1Data && city2Data) {
          const lat1 = Number(city1Data[1]);
          const lon1 = Number(city1Data[2]);
          const lat2 = Number(city2Data[1]);
          const lon2 = Number(city2Data[2]);

          const cityDistance = calculateHaversineDistance(
            lat1,
            lon1,
            lat2,
            lon2,
          );
          totalDistance += cityDistance;
          cityDistances.push(cityDistance);
          setHasError(false);
        } else {
          setHasError(true);
          setIsLoading(false);
          return;
        }
      }

      setTotalDistance(totalDistance);
      setDistances(cityDistances);
      setIsLoading(false);
    }, 1000);
  };

  return {
    calculateDistances,
    totalDistance,
    distances,
    isLoading,
    cities: cityList,
    hasError,
  };
};
