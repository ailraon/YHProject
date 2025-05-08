import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const MainCreateButton = styled.button`
  width: 120px;
  height: 40px;
  padding: 10px;
  border-radius: 50px;
  border: 0;
  color: rgb(137, 152, 232);
  background-color: white;
  font-weight: bold;
  cursor: pointer;
`;

const NotFound = () => {
  const navigate = useNavigate();

  const backAction = () => {
    navigate('/');
  };
  return (
    <Container>
      <h2>잘못된 페이지에요.</h2>
      <MainCreateButton onClick={backAction}>돌아가기</MainCreateButton>
    </Container>
  );
};

export default NotFound;
