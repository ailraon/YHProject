import React from 'react';
import styled from 'styled-components';

import test from "../assets/test.jpg"

const MainSection = styled.section`
  display: flex;
  background-color: rgb(137, 152, 232);
  color: white;
`

const ContentContainer = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  height: 100%;
  padding: 100px 0;
`

const SecondSection = styled.section`
  margin: 0 auto;
  max-width: 1440px;
  height: 100%;

  & > h3 {
    font-size: 24px;
    margin-left: 1rem;
  }
`

const MainTitleBox = styled.div`
  
`

const MainTitle = styled.h2`
  font-size: 32px;
`

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
`

const StairEffect = styled.span`
  bottom: -10px;
`

const PlanListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 1rem;
`

const PlanItemContainer = styled.div`
  width: 300px;
  border: 1px solid #c3c3c3;
  padding: 10px;
  border-radius: 15px;
`

const PlanItemImg = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 15px;
  object-fit: cover;
`

const PlanItemTitle = styled.h4`
  
`

const PlanDescription = styled.p`
  
`

const MainPage = () => {
  return (
    <>
      <MainSection>
        <ContentContainer>
          <MainTitleBox>
            <MainTitle>여<StairEffect>행</StairEffect><span>하마</span>와 함께 떠나요</MainTitle>
          </MainTitleBox>
          <MainCreateButton>일정 생성</MainCreateButton>
        </ContentContainer>
      </MainSection>
      <SecondSection>
        <h3>다른 사용자들이 만든 일정</h3>
        <PlanListContainer>
          <PlanItemContainer>
            <PlanItemImg src={test} />
            <PlanItemTitle>제주도 여행 일정</PlanItemTitle>
            <PlanDescription>2박 3일</PlanDescription>
          </PlanItemContainer>
          <PlanItemContainer>
            <PlanItemImg src={test} />
            <PlanItemTitle>제주도 여행 일정</PlanItemTitle>
            <PlanDescription>2박 3일</PlanDescription>
          </PlanItemContainer>
          <PlanItemContainer>
            <PlanItemImg src={test} />
            <PlanItemTitle>제주도 여행 일정</PlanItemTitle>
            <PlanDescription>2박 3일</PlanDescription>
          </PlanItemContainer>
          <PlanItemContainer>
            <PlanItemImg src={test} />
            <PlanItemTitle>제주도 여행 일정</PlanItemTitle>
            <PlanDescription>2박 3일</PlanDescription>
          </PlanItemContainer>
          <PlanItemContainer>
            <PlanItemImg src={test} />
            <PlanItemTitle>제주도 여행 일정</PlanItemTitle>
            <PlanDescription>2박 3일</PlanDescription>
          </PlanItemContainer>
        </PlanListContainer>
      </SecondSection>
    </>
  );
};

export default MainPage;
