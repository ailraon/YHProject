import React, { useEffect, useMemo } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import styled from 'styled-components';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import useScheduleStore from '../../store/usePlanStore';
import Modal from './Modal';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GoogleMapContainer = styled.div`
  width: 100%;
  height: calc(100% - 80px);

  display: flex;
`;

const SearchContainer = styled.div`
  margin: 20px;
  min-width: 500px;
  max-width: 500px;
`;

const GoogleMapReadOnly = () => {
  const { id } = useParams();
  const { initSchedule, schedule } = useScheduleStore();

  useEffect(() => {
    const selectPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/plans/?id=${id}`);

        console.log('response : ', response.data[0]);

        if (response.data.length > 0) {
          initSchedule(response.data[0].schedule);
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

  useEffect(() => {
    console.log('schedule : ', schedule);
  }, [schedule]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLEMAP_API_KEY}>
      <GoogleMapContainer>
        <SearchContainer>
          {schedule.map((days, dayIndex) => {
            return (
              <DaysBox>
                <div>{dayIndex + 1}일차</div>
                {days.map((place, index) => {
                  return (
                    <PlaceItemContainer>
                      <PlaceItemImg src={place.imgUrl} />
                      <PlaceItemInfo>
                        <div>{index + 1}번</div>
                        <PlaceItemTitle>{place.name}</PlaceItemTitle>
                        <PlaceItemAddress>{place.address}</PlaceItemAddress>
                      </PlaceItemInfo>
                    </PlaceItemContainer>
                  );
                })}
              </DaysBox>
            );
          })}
        </SearchContainer>
        <Map
          defaultCenter={{ lat: 35.907757, lng: 127.766922 }}
          defaultZoom={8}
          gestureHandling="greedy"
          disableDefaultUI={true}
        >
          {schedule &&
            schedule.length > 0 &&
            schedule.map((day) => {
              return day.map((place) => {
                return <Marker position={{ lat: Number(place.lat), lng: Number(place.lng) }}></Marker>;
              });
            })}
        </Map>
        {/* 장소 상세보기 탭 */}
        {/* {isOpen && (
          <GoogleMapPlaceDetail
            selectedPlace={selectedPlace}
            isOpen={isOpen}
            close={closeAction}
          ></GoogleMapPlaceDetail>
        )} */}
      </GoogleMapContainer>
    </APIProvider>
  );
};

const SearchMode = styled.div`
  display: flex;
  padding: 15px;

  border: 1px solid gray;
  border-radius: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  border: 0;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const SearchBtn = styled.button`
  border: 0;
  background-color: unset;
  cursor: pointer;
`;

const SearchResultList = styled.ul`
  padding: 0;
  list-style: none;
  height: calc(100vh - 200px);
  overflow-y: scroll;
`;

const SearchResultItem = styled.li`
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
`;

const CreatePlanLeftBar = styled.div`
  width: 500px;
  height: 100%;
  display: flex;
`;

const CreatePlanWorkTab = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TabItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TabItem = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid rgba(137, 152, 232, 78%);
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TabContainer = styled.div`
  min-width: 400px;
  max-width: 400px;
  overflow-y: scroll;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4e73df;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #3561b4;
  }
`;

const DaysBox = styled.div`
  margin: 10px 0;
  border-radius: 10px;
  box-shadow:
    0px 4px 6px rgba(0, 0, 0, 0.1),
    0px 1px 3px rgba(0, 0, 0, 0.08);
  padding: 10px;
`;

const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: rgba(137, 152, 232, 78);
  color: white;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
`;

const SearchBox = () => {
  // 일정 탭 기능
  // 날짜 차이 계산 함수
  const { schedule } = useScheduleStore();

  // 검색 탭 기능

  // 지도에서 마커를 클릭했을 때 해당 장소의 정보를 설정
  // const handleSelectPlace = (place) => {
  //   // setSelectedPlace(place);

  //   console.log('location(lat, lng) : ', place.geometry.location.lat(), place.geometry.location.lng());

  //   // const { lat, lng } = place.geometry.location;
  //   const lat = place.geometry.location.lat();
  //   const lng = place.geometry.location.lng();
  //   map.panTo(new window.google.maps.LatLng(lat, lng));
  //   map.setZoom(17); // 줌 레벨을 변경
  // };
  // 장소탭 기능

  return (
    <CreatePlanLeftBar>
      <TabContainer>
        <>
          {schedule &&
            schedule.map((days, dayIndex) => {
              return (
                <DaysBox>
                  <div>{dayIndex + 1}일차</div>
                  <p>날짜 : </p>
                  {days.map((place, index) => {
                    return (
                      <PlaceItemContainer>
                        <PlaceItemImg src={place.imgUrl} />
                        <PlaceItemInfo>
                          <div>{index + 1}번</div>
                          <PlaceItemTitle>{place.name}</PlaceItemTitle>
                          <PlaceItemAddress>{place.address}</PlaceItemAddress>
                        </PlaceItemInfo>
                      </PlaceItemContainer>
                    );
                  })}
                </DaysBox>
              );
            })}
        </>
      </TabContainer>
    </CreatePlanLeftBar>
  );
};

export default GoogleMapReadOnly;

const PlaceItemContainer = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  margin-bottom: 10px;
`;

const PlaceItemImg = styled.img`
  max-width: 120px;
  min-width: 120px;
  max-height: 80px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
`;

const PlaceItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PlaceItemTitle = styled.h3`
  margin: 0;
`;

const PlaceItemAddress = styled.p`
  margin: 0;
`;

const DetailTabContainer = styled.div`
  position: relative;
  min-width: 300px;
  max-width: 300px;
`;

const DetailPlaceImg = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
`;

const DetailPlaceTitle = styled.h4``;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  background-color: unset;
  color: white;
  border: 0;
  width: 50px;
  height: 50px;
  font-size: 40px;
  cursor: pointer;
`;

const AddButton = styled.button`
  width: 80px;
  height: 50px;
  background-color: rgba(137, 152, 232, 78);
  color: white;
  border: 0;
  border-radius: 10px;
  margin-left: 10px;
  margin-top: 20px;
  cursor: pointer;
`;

// 장소 상세보기 탭
const GoogleMapPlaceDetail = ({ selectedPlace, close }) => {
  const imgUrl = useMemo(() => {
    if (selectedPlace && selectedPlace.photos.length > 0) {
      const options = {
        maxHeight: 200,
        maxWidth: 200,
      };
      const imgUrl = selectedPlace.photos[0].getUrl(options);
      console.log('imgUrl : ', imgUrl);
      return imgUrl;
    } else {
      return '';
    }
  }, [selectedPlace]);

  return (
    <>
      <DetailTabContainer>
        <DetailPlaceImg src={imgUrl} />
        <CloseButton onClick={close}>X</CloseButton>
        <div style={{ paddingLeft: '10px' }}>
          <DetailPlaceTitle>{selectedPlace?.name}</DetailPlaceTitle>
          <div>{selectedPlace?.formatted_address}</div>
        </div>
      </DetailTabContainer>
    </>
  );
};
