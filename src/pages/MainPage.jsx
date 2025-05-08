import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const MainSection = styled.section`
  display: flex;
  background-color: rgb(137, 152, 232);
  color: white;
`;

const ContentContainer = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  height: 100%;
  padding: 100px 0;
`;

const SecondSection = styled.section`
  margin: 0 auto;
  max-width: 1440px;
  height: 100%;

  & > h3 {
    font-size: 24px;
    margin-left: 1rem;
  }
`;

const MainTitleBox = styled.div``;

const MainTitle = styled.h2`
  font-size: 32px;
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

const StairEffect = styled.span`
  bottom: -10px;
`;

const PlanListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 1rem;
`;

const PlanItemContainer = styled.div`
  width: 300px;
  border: 1px solid #c3c3c3;
  padding: 10px;
  border-radius: 15px;
  transition: transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-10px);
  }
`;

const PlanItemImg = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 15px;
  object-fit: cover;
`;

const PlanItemTitle = styled.h4``;

const PlanDescription = styled.p``;

const MainPage = () => {
  const [selectPlans, setSelectPlans] = useState([]);
  const navigete = useNavigate();

  useEffect(() => {
    const selectPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/plans/?_limit=10`);

        console.log('response : ', response.data);

        if (response.data.length > 0) {
          setSelectPlans(response.data);
        } else {
          alert('일정 조회에 실패했습니다. 다시 시도해 주세요.');
        }
      } catch (error) {
        console.log(error);
        alert('일정 조회에 실패했습니다. 다시 시도해 주세요.');
      }
    };
    selectPlan();
  }, []);

  const onClickDetail = (id) => {
    navigete(`/detail/${id}`);
  };

  return (
    <>
      <MainSection>
        <ContentContainer>
          <MainTitleBox>
            <MainTitle>
              여<StairEffect>행</StairEffect>
              <span>하마</span>와 함께 떠나요
            </MainTitle>
          </MainTitleBox>
          <Link to={'/createPlan'} style={{ textDecoration: 'none', color: 'rgb(137, 152, 232)' }}>
            <MainCreateButton>일정 생성</MainCreateButton>
          </Link>
        </ContentContainer>
      </MainSection>
      <SecondSection>
        <h3>다른 사용자들이 만든 일정</h3>
        <PlanListContainer>
          {selectPlans &&
            selectPlans.length > 0 &&
            selectPlans.map((plan) => (
              <PlanItemContainer key={plan.id} onClick={() => onClickDetail(plan.id)}>
                <PlanItemImg src={plan.thumnailImg} />
                <PlanItemTitle>{plan.title}</PlanItemTitle>
                <PlanDescription>
                  {plan.startDate} ~ {plan.endDate}
                </PlanDescription>
              </PlanItemContainer>
            ))}
          {/* <PlanItemContainer>
            <PlanItemImg src={test} />
            <PlanItemTitle>제주도 여행 일정</PlanItemTitle>
            <PlanDescription>2박 3일</PlanDescription>
          </PlanItemContainer> */}
        </PlanListContainer>
      </SecondSection>
    </>
  );
};

export default MainPage;
