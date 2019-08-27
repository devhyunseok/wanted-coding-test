import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  *:focus {
    outline: none;
  }

  body {
    padding: 0;
    margin: 0;
  }
  
  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: 0;
    box-shadow: none;
    font-family: inherit;
    line-height: inherit;
    -webkit-appearance: button;
    cursor: pointer;
    text-transform: none;
    overflow: visible;
    color: inherit;
    font: inherit;
  }
`;

export default GlobalStyle;
