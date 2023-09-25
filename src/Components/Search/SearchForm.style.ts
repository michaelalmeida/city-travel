import styled from "styled-components";

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
`;

export const SecondaryFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 108px;
  gap: 20px;
`;

export const AdditionalTimelineInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
`;

export const InputsWrapper = styled.div`
  display: flex;
`;

export const SubmitWrapper = styled.div`
  margin: 35px 0 0;
  display: flex;
  justify-content: center;
`;
