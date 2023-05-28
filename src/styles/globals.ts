import { createGlobalStyle } from "styled-components";

export const ResetCss = createGlobalStyle`
    :root {
        --link-color: #222;
        --link-hover-color: #ae1;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 18px;
    }

    html,
    body {
        font-family: 'Roboto Slab', serif;
        background-color: antiquewhite;
    }
`;
