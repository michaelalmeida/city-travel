import {ReactComponent as LoadingSpinIcon} from "../../Assets/Icons/Loading.svg";

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
import {useSearchForm} from "./useSearchForm";

export const SearchForm = () => {
  const {t} = useTranslation();

  const {
    onSubmit,
    shouldBeDisabled,
    isLoading,
    cities,
    isTheItemRemovable,
    removeItemHandler,
    inputHandler,
    onClearInput,
    onItemSelect,
    addCityHandler,
    inputNumberHandler,
    passengers,
    date,
    onChangeDate,
  } = useSearchForm();

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
                    onChange={event => inputHandler(event, position)}
                    label={label}
                    clearInput={() => onClearInput(position)}
                    hasError={hasError}
                    index={position}
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
            onChange={onChangeDate}
          />
        </SecondaryFieldsWrapper>
      </InputsWrapper>
      <SubmitWrapper>
        <Button type="submit" disabled={shouldBeDisabled}>
          {t("app.submit")} {isLoading && <LoadingSpinIcon />}
        </Button>
      </SubmitWrapper>
    </Form>
  );
};
