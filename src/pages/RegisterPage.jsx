import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 300px;
  padding: 15px;
  border: 0px;

  font-size: 16px;
  color: #656565;
  background-color: rgba(0, 0, 0, 0);

  &:focus {
    outline: none;
  }
`;

const InputBox = styled.div`
  background-color: #e8e8e8;
  border-radius: 10px;
  margin-bottom: 25px;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  width: 330px;
  padding: 15px;
  border: 0;
  border-radius: 10px;
  margin: 10px 0;
  background-color: rgba(137, 152, 232, 78);
  color: white;
  cursor: pointer;
`;

const RegisterPage = () => {
  return (
    <Container>
      <h2>회원가입</h2>
      <form action="post">
        <Label htmlFor="">아이디</Label>
        <InputBox>
          <Input type="text" placeholder="아이디를 입력하세요." />
        </InputBox>
        <Label htmlFor="">비밀번호</Label>
        <InputBox>
          <Input type="text" placeholder="비밀번호를 입력하세요." />
        </InputBox>
        <Label htmlFor="">이름</Label>
        <InputBox>
          <Input type="text" placeholder="이름를 입력하세요." />
        </InputBox>
        <Label htmlFor="">나이</Label>
        <InputBox>
          <Input type="text" placeholder="나이를 입력하세요." />
        </InputBox>
        <ActionButton>회원가입</ActionButton>
      </form>
    </Container>
  );
};

export default RegisterPage;
