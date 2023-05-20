import styled from "styled-components";

export const Footer = styled.footer`
  padding: 18px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SocialIcons = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  svg {
    transition: all 0.5s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.15);
    }
  }
`;

export const Credits = styled.i`
  font-weight: 400;
`;
