import styled from "styled-components";
import {BLACK, GRAY, MAIN_COLOR, WHITE} from "../../Constants/Colors";
import {
  BORDER_RADIUS_BUTTON,
  FONT_SIZE_NORMAL,
  FONT_SIZE_SMALL,
} from "../../Constants/Sizes";

export const Button = styled.button`
  display: inline-block;
  padding: 8px 12px;
  background: ${BLACK};
  color: ${WHITE};
  font-size: ${FONT_SIZE_NORMAL}px;
  border: none;
  border-radius: ${BORDER_RADIUS_BUTTON}px;
  cursor: pointer;

  &:disabled {
    background: ${GRAY};
  }
`;

export const LinkButton = styled.button`
  display: inline-block;
  padding: 0;
  background: none;
  color: ${MAIN_COLOR};
  font-size: ${FONT_SIZE_SMALL}px;
  border: none;
  border-radius: ${BORDER_RADIUS_BUTTON}px;
  cursor: pointer;
`;
