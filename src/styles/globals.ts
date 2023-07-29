import { createGlobalStyle } from "styled-components";

export const ResetCss = createGlobalStyle`
    :root {
        --bg-form-color: #252525;
        --bg-header-footer: #1A202C;
        --bg-sidebar: #171923;
        --white: #f5f5ff;
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
        background-color: var(--white);
    }

    th, td, h3 {
        color: var(--white);
    }

    th {
        font-size: 1.05em;
        font-weight: 500;
    }

    td {
        font-weight: 400;
    }
`;
