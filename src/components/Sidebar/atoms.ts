import styled from "styled-components";

export const Container = styled.div<{ sidebar: boolean }>`
  background-color: var(--bg-sidebar);
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 340px;
  left: ${props => props.sidebar ? "0" : "-100%"};
  animation: showSidebar .4s;

  > svg {
    position: fixed;
    color: var(--white);
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 300px;
    }
  }
`;

export const Content = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 100px;
`;