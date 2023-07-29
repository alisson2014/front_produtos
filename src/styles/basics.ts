import { Container } from "react-bootstrap";
import styled from "styled-components";

export const MainTitle = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  text-align: center;
`;

export const Title = styled.h2`
    font-size: 2em;
    font-weight: 500;
    text-align: center;
    margin-left: calc(35vh - 32px);
`;

export const SubTitle = styled.h3`
    font-size: 1.5em;
    font-weight: 400;
    text-align: center;
`;

export const TableActions = styled.th`
  text-align: center;
  width: 256px;
`;

export const TableButtons = styled.td`
  width: 256px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

export const Page = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
`;

export const Top = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  place-items: center;

  > button {
    justify-self: right;
  }
`;