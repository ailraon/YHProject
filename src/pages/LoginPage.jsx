import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.form``;

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

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

// const Logo = styled.img``;

const InputBox = styled.div`
  background-color: #e8e8e8;
  border-radius: 10px;
  margin-bottom: 25px;
  margin-top: 10px;
`;

const LoginButton = styled.button`
  width: 330px;
  padding: 15px;
  border: 0;
  border-radius: 10px;
  margin: 10px 0;
  background-color: rgba(137, 152, 232, 78);
  color: white;
  cursor: pointer;
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const LoginPage = () => {
  return (
    <Container>
      {/* <Logo /> */}
      <LoginForm>
        <Label>아이디</Label>
        <InputBox>
          <Input type="text" placeholder="아이디를 입력해주세요." />
        </InputBox>
        <Label>비밀번호</Label>
        <InputBox>
          <Input type="password" placeholder="비밀번호를 입력해주세요." />
        </InputBox>
        <LoginButton>로그인</LoginButton>
      </LoginForm>
      <div>
        <NavLink to="/register">
          <strong>회원가입</strong>
        </NavLink>
      </div>
    </Container>
  );
};

export default LoginPage;
