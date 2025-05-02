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

const ContentContainer = ({ chilren }) => {
  return <Container>{chilren}</Container>;
};

export default ContentContainer;
