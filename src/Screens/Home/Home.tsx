import {useMemo, useState} from "react";
import {Modal} from "../../Components/Modal";
import {AutocompleteInput} from "../../Components/UI";
import {Container} from "../../UI/Container";
import {useTranslation} from "react-i18next";
import {useCitiesList} from "../../Hooks/useCitiesList";
import debounce from "lodash.debounce";

export const Home = () => {
  const {t} = useTranslation();
  const [value, setValue] = useState("");
  const [currentCitySearch, setCurrentCitySearch] = useState("");

  const {cities, isLoading} = useCitiesList(currentCitySearch);

  const debounceSetCityName = useMemo(
    () =>
      debounce((value: string) => {
        setCurrentCitySearch(value);
      }, 500),
    [],
  );

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    debounceSetCityName(event.target.value);
  };

  return (
    <Container>
      <Modal>
        <div>
          <AutocompleteInput
            name="originCity"
            value={value}
            onChange={inputHandler}
            label={t("form.originCity")}
            resultList={cities}
            isLoading={isLoading}
          />
        </div>
      </Modal>
    </Container>
  );
};
