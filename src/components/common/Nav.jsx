import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  height: 60px;
  background-color: rgba(137, 152, 232, 78);
  color: white;
`;

const ContentBox = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
`;

const Logo = styled.div`
  margin-left: 1rem;
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const Menu = styled.li`
  padding: 0 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Nav = () => {
  // 테스트 용으로 로그인 상태 관리만 잠시 작성
  const [isLogin, setIsLogin] = useState(false);

  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Navbar>
      <ContentBox>
        <Logo>
          <NavLink to="/">여행하마</NavLink>
        </Logo>
        <LinkList>
          <Menu>
            <NavLink to="/">홈</NavLink>
          </Menu>
          <Menu>
            <NavLink to="/createPlan">일정 생성</NavLink>
          </Menu>
          <Menu>
            <NavLink to="/login">로그인</NavLink>
          </Menu>
          {!isLogin ? (
            <Menu>
              <button onClick={toggleLogin}>로그인</button>
            </Menu>
          ) : (
            <Menu>
              <button onClick={toggleLogin}>로그아웃</button>
            </Menu>
          )}
        </LinkList>
      </ContentBox>
    </Navbar>
  );
};

export default Nav;
