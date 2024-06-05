import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root, #movie-theater-app {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

export const AppWrapper = styled.div.attrs({ id: "movie-theater-app" })`
  position: relative;
`;
