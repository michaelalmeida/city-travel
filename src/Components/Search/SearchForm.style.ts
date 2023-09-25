import styled from "styled-components";
import {MAX_SCREEN_SIZE} from "../../Constants/Sizes";

export const Form = styled.form`
  padding: 0 60px;
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

export const MainSearchFieldsWrapper = styled.div`
  margin-right: 80px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media screen and (max-width: ${MAX_SCREEN_SIZE}px) {
    margin-right: 0;
  }
`;

export const SecondaryFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 108px;
  gap: 20px;

  @media screen and (max-width: ${MAX_SCREEN_SIZE}px) {
    margin-top: 44px;
    flex-direction: row;
  }
`;

export const AdditionalTimelineInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
`;

export const InputsWrapper = styled.div`
  display: flex;

  @media screen and (max-width: ${MAX_SCREEN_SIZE}px) {
    flex-direction: column;
  }
`;

export const SubmitWrapper = styled.div`
  margin: 35px 0 0;
  display: flex;
  justify-content: center;
`;
