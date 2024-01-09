import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html,
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: "Noto Sans KR", sans-serif;
    }
    #root {
       min-height: 100vh;
    }
`;

export default GlobalStyles;
