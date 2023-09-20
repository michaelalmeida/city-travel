import styled from "styled-components";
import {
  MODAL,
  MAX_SCREEN_SIZE,
  PADDING_MEDIUM,
  BORDER_RADIUS,
} from "../../Constants/Sizes";
import {WHITE} from "../../Constants/Colors";

export const ModalWrapper = styled.div`
  width: ${MODAL}px;
  display: flex;
  padding: ${PADDING_MEDIUM}px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${WHITE};
  border-radius: ${BORDER_RADIUS}px;

  @media screen and (max-width: ${MAX_SCREEN_SIZE}px) {
    width: 100%;
    height: 100vh;
  }
`;
