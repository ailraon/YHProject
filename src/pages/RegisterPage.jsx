import axios from 'axios';
import React, { useState } from 'react';
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
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 history 객체

  // 유효성 검사
  const validateForm = () => {
    if (!id || !password || !name || !age) {
      return '모든 필드를 입력해 주세요.';
    }

    if (password.length < 7) {
      return '비밀번호는 7자 이상이어야 합니다.';
    }

    if (!/^\d+$/.test(age)) {
      return '나이는 숫자만 입력할 수 있습니다.';
    }

    return ''; // 에러 없으면 빈 문자열 반환
  };

  // 회원가입 처리
  const handleRegister = async (e) => {
    e.preventDefault();

    const validationError = validateForm(); // 폼 유효성 검사
    if (validationError) {
      setError(validationError); // 유효성 검사 실패 시 에러 메시지 설정
      return;
    }

    try {
      // 사용자 정보를 json-server로 POST 요청
      const response = await axios.post('http://localhost:5000/users', {
        id,
        password,
        name,
        age,
      });
      console.log(response);

      // 회원가입 성공 시 로그인 페이지로 이동
      // history.push('/login');
      navigate('/login');
    } catch (error) {
      console.log('error : ', error);
      setError('회원가입 실패. 다시 시도해 주세요.');
    }
  };

  return (
    <Container>
      <h2>회원가입</h2>
      <form action="post" onSubmit={handleRegister}>
        <Label htmlFor="">아이디</Label>
        <InputBox>
          <Input type="text" placeholder="아이디를 입력하세요." value={id} onChange={(e) => setId(e.target.value)} />
        </InputBox>
        <Label htmlFor="">비밀번호</Label>
        <InputBox>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputBox>
        <Label htmlFor="">이름</Label>
        <InputBox>
          <Input type="text" placeholder="이름을 입력하세요." value={name} onChange={(e) => setName(e.target.value)} />
        </InputBox>
        <Label htmlFor="">나이</Label>
        <InputBox>
          <Input type="number" placeholder="나이를 입력하세요." value={age} onChange={(e) => setAge(e.target.value)} />
        </InputBox>
        <ActionButton>회원가입</ActionButton>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* 에러 메시지 표시 */}
    </Container>
  );
};

export default RegisterPage;
