import { createGlobalStyle } from "styled-components";

export const ResetCss = createGlobalStyle`
    :root {
        --link-color: #222;
        --bg-form-color: #252525;
        --whithe: #f5f5ff;
        --link-hover-color: #ae1;
    }

    *, *::after, *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 18px;
    }

    html,
    body {
        font-family: "Roboto Slab", serif;
        background-color: var(--whithe);
    }

    th, td {
        color: var(--whithe);
    }

    th {
        font-size: 1.05em;
        font-weight: 500;
    }

    td {
        font-weight: 400;
    }
`;
