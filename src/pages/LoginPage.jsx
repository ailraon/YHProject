import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loginLogo from "../assets/loginLogo.png"
import axios from 'axios';
import useUserStore from "../store/useUserStore";

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

const Logo = styled.img`
  margin-bottom: 20px;
`;

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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 에러 메시지 상태 추가
  const navigate = useNavigate(); // 로그인 후 페이지 이동을 위한 history 객체 사용

  const { login } = useUserStore(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/users/?id=${id}&password=${password}`);

      // 로그인 성공 시, 로그인한 유저 정보를 상태에 저장
      if (response.data.length > 0) {
        // 로그인 성공 후, 사용자의 데이터를 상태에 저장하고, 다른 페이지로 이동
        console.log("Login successful:", response.data);
        navigate("/"); // 로그인 성공 후 대시보드 페이지로 이동
      } else {
        setError("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log(error);
      setError("로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <Container>
      <Logo src={loginLogo} />
      <LoginForm onSubmit={handleLogin}>
        <Label>아이디</Label>
        <InputBox>
          <Input 
            type="text" 
            placeholder="아이디를 입력해주세요." 
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </InputBox>
        <Label>비밀번호</Label>
        <InputBox>
          <Input 
            type="password" 
            placeholder="비밀번호를 입력해주세요." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputBox>
        <LoginButton>로그인</LoginButton>
      </LoginForm>
      {error && <div style={{ color: "red" }}>{error}</div>} {/* 에러 메시지 표시 */}
      <div>
        <NavLink to="/register">
          <strong>회원가입</strong>
        </NavLink>
      </div>
    </Container>
  );
};

export default LoginPage;
