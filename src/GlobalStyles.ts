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
    font-family: -apple-system, Helvetica, Arial, "hiragino kaku gothic pro", meiryo, "Microsoft YaHei", "ms pgothic", "Apple SD Gothic Neo", "Nanum Gothic", "Malgun Gothic", sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333333;
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

  dd, ul {
    margin: 0;
    padding: 0;
    border: 0;
  }
`;

export default GlobalStyle;
