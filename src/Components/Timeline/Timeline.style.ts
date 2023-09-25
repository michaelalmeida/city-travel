import styled from "styled-components";
import {GRAY} from "../../Constants/Colors";

export const TimelineWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  gap: 20px;
`;

export const TimelineItemWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
`;

interface LineProps {
  $lastItem?: boolean;
}

export const Line = styled.div<LineProps>`
  position: relative;
  display: flex;
  margin: 0 48px 0 0;

  svg {
    z-index: 3;
    margin-top: 25px;
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 2;
    top: 40px;
    bottom: 0;
    left: 5px;
    border-left: 2px dotted ${GRAY};

    height: ${props => (props.$lastItem ? 0 : "52px")};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-basis: 324px;
`;

export const RemoveContainer = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: row;

  svg {
    margin-top: 8px;
  }

  button {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
