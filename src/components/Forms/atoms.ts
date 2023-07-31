import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

export const Forms = styled(Form)`
    width: max-content;
    padding: 44px 32px;
    margin: 0.85em auto;
    display: flex;
    flex-flow: column nowrap;
    gap: 16px;
    background-color: var(--bg-form-color);
    color: var(--whithe);
    box-shadow: 5px 5px 2.5px #F55;
    border-radius: 16px;
`;

export const Group = styled(Form.Group)``;

export const Label = styled(Form.Label)`
    color: var(--white);
    font-size: 1.1em; 
    font-weight: 400;
`;

export const Input = styled(Form.Control)`
    &.error {
        box-shadow: 0 0 0 0.12em rgba(255, 72, 72, 0.72);
    }
`;

export const Select = styled(Form.Select)``;

export const Feedback = styled(Form.Text)`
  color: rgb(255, 72, 72);
`;

export const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 16px;
`;

export const BackButton = styled(Button)`
    margin-left: 32px;
    width: 72px;
    text-align: center;
`;