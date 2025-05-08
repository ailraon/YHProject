import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../store/useUserStore';

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

const MyPage = () => {
  const { user, setUser } = useUserStore();
  const [name, setName] = useState(user?.name);
  const [age, setAge] = useState(Number(user?.age));
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 history 객체

  // 로그인 없이 마이페이지 접속시
  useEffect(() => {
    console.log(user);
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }
  }, []);

  // 유효성 검사
  const validateForm = () => {
    if (!name || !age) {
      return '모든 필드를 입력해 주세요.';
    }

    if (!/^\d+$/.test(age)) {
      return '나이는 숫자만 입력할 수 있습니다.';
    }

    return ''; // 에러 없으면 빈 문자열 반환
  };

  // 회원수정 처리
  const handleRegister = async (e) => {
    e.preventDefault();

    const validationError = validateForm(); // 폼 유효성 검사
    if (validationError) {
      setError(validationError); // 유효성 검사 실패 시 에러 메시지 설정
      return;
    }

    try {
      console.log(user);
      // 사용자 정보를 json-server로 POST 요청
      const response = await axios.patch(`http://localhost:5000/users/${user.id}`, {
        name,
        age,
      });
      console.log(response.data);

      // 회원수정 성공 시 새로고침
      setUser({
        id: user.id,
        password: user.password,
        name: name,
        age: age,
      });
      navigate('/mypage');
    } catch (error) {
      console.log('error : ', error);
      setError('회원수정 실패. 다시 시도해 주세요.');
    }
  };

  return (
    <Container>
      <h2>회원수정</h2>
      <form action="post" onSubmit={handleRegister}>
        <Label htmlFor="">이름</Label>
        <InputBox>
          <Input type="text" placeholder="이름을 입력하세요." value={name} onChange={(e) => setName(e.target.value)} />
        </InputBox>
        <Label htmlFor="">나이</Label>
        <InputBox>
          <Input type="number" placeholder="나이를 입력하세요." value={age} onChange={(e) => setAge(e.target.value)} />
        </InputBox>
        <ActionButton>회원수정</ActionButton>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* 에러 메시지 표시 */}
    </Container>
  );
};

export default MyPage;
