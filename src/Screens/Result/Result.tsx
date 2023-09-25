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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const passengersParam = searchParams.get("passengers");
    const totalParam = searchParams.get("total");
    const date = searchParams.get("date");

    if (passengersParam) {
      setPassengers(parseInt(passengersParam));
    }

    if (totalParam) {
      setTotal(parseInt(totalParam));
    }

    if (date) {
      setDate(new Date(date));
    }
  }, []);

  return (
    <Container>
      <Modal>
        <>
          <p>
            {total} km {t("results.totalKM")}
          </p>
          <p>
            {passengers} {t("form.passengers")}
          </p>
          <p>{dateFormatter(date)}</p>

          <Button onClick={() => navigate(-1)}>{t("app.back")}</Button>
        </>
      </Modal>
    </Container>
  );
};
