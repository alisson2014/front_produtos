import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";

export const TextError = styled(Form.Text)`
  color: rgb(255, 72, 72);
`;

export const MBody = styled(Modal.Body)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
