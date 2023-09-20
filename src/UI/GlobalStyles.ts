import {createGlobalStyle} from "styled-components";
import {BACKGROUND, BLACK, MAIN_COLOR} from "../Constants/Colors";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    color: ${BLACK};
    background-color: ${BACKGROUND};
    font-family: 'Inter', sans-serif;
    font-size: 1.4rem;
  }

  a {
    color: ${MAIN_COLOR};
    text-decoration: none;
    transition: all 0.5s ease;
  }

  p {
    font-size: 1.4rem;
  }
  
  div {
      box-sizing: border-box;
  }
  

`;

export default GlobalStyle;
