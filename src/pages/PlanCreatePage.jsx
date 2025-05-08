import React from 'react';
import GoogleMap from '../components/common/GoogleMap';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlanCreatePage = () => {
  return <GoogleMap></GoogleMap>;
};

export default PlanCreatePage;
