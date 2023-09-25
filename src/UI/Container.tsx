import styled from "styled-components";
import {MAX_SCREEN_SIZE} from "../Constants/Sizes";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media screen and (max-width: ${MAX_SCREEN_SIZE}px) {
    height: 100vh;
  }
`;
