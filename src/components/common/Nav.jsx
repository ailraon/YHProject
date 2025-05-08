import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/MainLogo.png';
import useUserStore from '../../store/useUserStore';

const Navbar = styled.nav`
  height: 80px;
  background-color: rgba(137, 152, 232, 78%);
  color: white;
`;

const ContentBox = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  height: 100%;
`;

const Logo = styled.div`
  margin-left: 1rem;
`;

const LogoImg = styled.img`
  width: 80px;
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
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = () => {
  // 테스트 용으로 로그인 상태 관리만 잠시 작성
  const { user, isLoggedIn, logout } = useUserStore();

  const logoutAction = () => {
    if (confirm('정말 삭제하시겠습니까??') == true) {
      //확인
      logout();
    } else {
      //취소
      return false;
    }
  };

  return (
    <Navbar>
      <ContentBox>
        <Logo>
          <NavLink to="/">
            <LogoImg src={logo} alt="" />
            여행하마
          </NavLink>
        </Logo>
        <LinkList>
          <Menu>
            <NavLink to="/">홈</NavLink>
          </Menu>
          <Menu>
            <NavLink to="/createPlan">일정 생성</NavLink>
          </Menu>
          {!isLoggedIn ? (
            <>
              <Menu>
                <NavLink to="/login">로그인</NavLink>
              </Menu>
            </>
          ) : (
            <>
              <Menu>
                <NavLink to="/mypage">마이페이지</NavLink>
              </Menu>
              <div>
                <p>
                  환영합니다. <strong>{user.name}</strong> 님
                </p>
              </div>
              <Menu>
                <NavLink to="/" onClick={logoutAction}>
                  로그아웃
                </NavLink>
              </Menu>
            </>
          )}
        </LinkList>
      </ContentBox>
    </Navbar>
  );
};

export default Nav;
