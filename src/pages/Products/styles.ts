import { Container } from "react-bootstrap";
import styled from "styled-components";

export const Box = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 90px;
`;

export const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  text-align: center;
`;

export const Buttons = styled.td`
  width: 256px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;
