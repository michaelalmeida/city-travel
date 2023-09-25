import {useEffect, useState} from "react";
import {Modal} from "../../Components/Modal";
import {Container} from "../../UI/Container";
import {useTranslation} from "react-i18next";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Button} from "../../Components/UI/Button";

const dateFormatter = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const Result = () => {
  const {t} = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasError = searchParams.get("hasError") === "true";

  const [total, setTotal] = useState(0);
  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState(new Date());
  const [citiesNames, setCitiesNames] = useState([]);
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    const passengersParam = searchParams.get("passengers");
    const totalParam = searchParams.get("total");
    const date = searchParams.get("date");
    const cities = searchParams.getAll("cities");
    const distances = searchParams.getAll("distances");

    if (passengersParam) {
      setPassengers(parseInt(passengersParam));
    }

    if (totalParam) {
      setTotal(parseInt(totalParam));
    }

    if (date) {
      setDate(new Date(date));
    }

    if (cities.length > 0) {
      const citiesNameAsArray = JSON.parse(cities[0]);
      setCitiesNames(citiesNameAsArray);
    }

    if (distances.length > 0) {
      const distanceAsArray = JSON.parse(distances[0]);
      setDistances(distanceAsArray);
    }
  }, []);

  return (
    <Container>
      <Modal>
        <>
          {hasError ? (
            <h1>{t("results.error")}</h1>
          ) : (
            <>
              {citiesNames.map(city => (
                <p key={city}>{city}</p>
              ))}
              {distances.map(distance => (
                <p key={distance}>{distance}</p>
              ))}
              <p>
                {total} km {t("results.totalKM")}
              </p>
              <p>
                {passengers} {t("form.passengers")}
              </p>
              <p>{dateFormatter(date)}</p>
            </>
          )}

          <Button onClick={() => navigate(-1)}>{t("app.back")}</Button>
        </>
      </Modal>
    </Container>
  );
};
