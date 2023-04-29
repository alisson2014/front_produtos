import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
`;

export const Label = styled.label`
  color: #151515;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const Input = styled.input`
  font-size: 1.35rem;
  font-weight: 400;
  line-height: 20px;
  background-color: #dfedff;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.06);
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 24px;
`;
