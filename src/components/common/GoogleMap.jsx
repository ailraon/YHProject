import React from 'react';
import { Map } from '@vis.gl/react-google-maps';
import styled from 'styled-components';

const GoogleMapContainer = styled(Map)`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GoogleMap = () => {
  return (
    <GoogleMapContainer
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  );
};

export default GoogleMap;
