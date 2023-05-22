import styled from "styled-components";

export const Form = styled.form``;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

export const Label = styled.label`
  color: #151515;
  font-size: 1.5rem;
  font-weight: 500;
  align-self: flex-start;
`;

export const Input = styled.input`
  font-size: 1.35rem;
  font-weight: 400;
  line-height: 20px;
  background-color: #d1d1d1;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.06);
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 24px;

  &.input-error {
    outline-color: rgb(255, 72, 72);
  }
`;

export const Error = styled.p`
  color: rgb(255, 72, 72);
  font-size: 0.8rem;
`;
