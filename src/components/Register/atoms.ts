import Form from "react-bootstrap/Form";
import styled from "styled-components";

export const Forms = styled(Form)`
    width: 640px;
    padding: 48px;
    margin: 6em auto;
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
    font-size: 1.1em; 
    font-weight: 400;
    font-style: oblique;
`;

export const Input = styled(Form.Control)`
    &.error {
        box-shadow: 0 0 0 0.12em rgba(255, 72, 72, 0.72);
    }
`;