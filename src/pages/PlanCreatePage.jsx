import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
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
  return (
    // <APIProvider apiKey={import.meta.env.VITE_GOOGLEMAP_API_KEY}>
    //   <Container>
    //     <GoogleMap></GoogleMap>
    //     <div>
    //       <h2>안녕</h2>
    //     </div>
    //   </Container>
    // </APIProvider>
    <GoogleMap></GoogleMap>
  );
};

export default PlanCreatePage;
