import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Trebuchet MS";
        line-height: 1;
    }

    /* ie11 fix */
    #app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
`;
