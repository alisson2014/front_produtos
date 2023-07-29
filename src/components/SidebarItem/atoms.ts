import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.li`
  margin: 0 15px 10px;
`;

export const LinkTo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  background-color: #1A202C; 
  font-size: 20px;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;

  > svg {
    margin: 0 20px;
  }

  &:hover {
    background-color: black;
  }
`;