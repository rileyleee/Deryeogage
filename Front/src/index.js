import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";


// GlobalStyle 생성
// const GlobalStyle = createGlobalStyle`
//   body {
//     // Chrome, Safari
//     &::-webkit-scrollbar {
//       display: none;
//     }

//     // Firefox
//     scrollbar-width: none;

//     // IE and Edge
//     -ms-overflow-style: none;
//   }
// `;

// GlobalStyle 생성
const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: scroll;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <GlobalStyle />
    <App />
  </RecoilRoot>
);