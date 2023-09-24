import styled from "styled-components";
import {
  BORDER_RADIUS_INPUT,
  FONT_SIZE_SMALL,
  PADDING_SMALL,
} from "../../../Constants/Sizes";
import {
  BLACK,
  ERROR,
  GRAY,
  WHITE,
  MAIN_COLOR_LIGHTER,
  MAIN_COLOR,
} from "../../../Constants/Colors";

interface InputProps {
  hasError?: boolean;
}

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 8px 32px 8px 12px;
  color: ${props => (props.hasError ? ERROR : BLACK)};
  background: ${WHITE};
  border-radius: ${BORDER_RADIUS_INPUT}px;
  border: 1px solid ${props => (props.hasError ? ERROR : GRAY)};
  font-size: ${FONT_SIZE_SMALL}px;
  box-sizing: border-box;
`;

export const Label = styled.label`
  font-size: ${FONT_SIZE_SMALL}px;
  line-height: 16px;
  box-sizing: border-box;
`;

export const ErrorMessage = styled.span`
  font-size: ${FONT_SIZE_SMALL}px;
  color: ${ERROR};
`;

export const List = styled.ul`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  padding: ${PADDING_SMALL}px;
  margin: 0;
  list-style: none;
  background: ${WHITE};
  border-radius: ${BORDER_RADIUS_INPUT}px;
  border: 1px solid ${MAIN_COLOR_LIGHTER};
  font-size: ${FONT_SIZE_SMALL}px;
  z-index: 1;
  box-sizing: border-box;
`;

export const ListItem = styled.li`
  padding: ${PADDING_SMALL}px;
  border-radius: ${BORDER_RADIUS_INPUT}px;
  cursor: pointer;

  &:hover {
    background: ${MAIN_COLOR_LIGHTER};
  }
`;

export const DeleteButton = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  right: 0;
  top: 18px;
  cursor: pointer;
`;

export const LoadingWrapper = styled.div`
  position: absolute;
  right: 6px;
  top: 22px;
`;

interface NumberInputProps {
  $hasError?: boolean;
}

export const NumberInputWrapper = styled.div<NumberInputProps>`
  display: flex;
  min-width: 100px;
  padding: 8px 10px;
  color: ${props => (props.$hasError ? ERROR : BLACK)};
  background: ${WHITE};
  border-radius: ${BORDER_RADIUS_INPUT}px;
  border: 1px solid ${props => (props.$hasError ? ERROR : GRAY)};
  font-size: ${FONT_SIZE_SMALL}px;
  box-sizing: border-box;
`;

export const NumberInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-size: ${FONT_SIZE_SMALL}px;
  box-sizing: border-box;
`;

export const ChangeNumberValueButton = styled.button`
  width: 22px;
  height: 22px;
  border: none;
  background: ${MAIN_COLOR_LIGHTER};
  border-radius: ${BORDER_RADIUS_INPUT}px;

  &:hover {
    background: ${MAIN_COLOR};
  }
`;
