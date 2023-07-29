import styled from "styled-components";

export const Footer = styled.footer`
  height: 100px;
  background-color: var(--bg-header-footer); 
  color: var(--white);
  box-shadow: 0 0 20px 3px;
  padding: 18px 9px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const SocialIcons = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > svg {
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
