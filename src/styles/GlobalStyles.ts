import { createGlobalStyle } from "styled-components";
import allanNor from "./fonts/allan-v24-latin-regular.woff2";
import allan700 from "./fonts/allan-v24-latin-700.woff2";
import notoNor from "./fonts/noto-sans-kr-v36-korean_latin-regular.woff2";
import noto700 from "./fonts/noto-sans-kr-v36-korean_latin-700.woff2";

const GlobalStyles = createGlobalStyle`
    @font-face {
    font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url(${notoNor}) format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
    }
    /* noto-sans-kr-700 - korean_latin */
    @font-face {
    font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    src: url(${noto700}) format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
    }
    /* allan-regular - latin */
    @font-face {
    font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Allan';
    font-style: normal;
    font-weight: 400;
    src: url(${allanNor}) format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
    }
    /* allan-700 - latin */
    @font-face {
    font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Allan';
    font-style: normal;
    font-weight: 700;
    src: url(${allan700}) format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
    }

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
