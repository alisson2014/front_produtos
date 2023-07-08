import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 12vh;
  padding: 8px;

  background: rgba(256, 255, 256, 0.1);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-bottom: 2px solid #111;
`;

export const Nav = styled.nav``;

export const Menu = styled.ul`
  list-style: none;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
