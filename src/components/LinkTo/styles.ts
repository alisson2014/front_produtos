import styled from "styled-components";

export const Item = styled.li`
  a {
    text-decoration: none;
    transition: all 0.3s linear;
    color: var(--link-color);
    font-weight: 500;
    font-size: 1.1rem;

    &:hover {
      color: var(--link-hover-color);
    }
  }
`;
