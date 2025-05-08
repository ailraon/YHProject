import React, { useState, useEffect, useMemo, useRef } from 'react';
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import styled from 'styled-components';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import useScheduleStore from '../../store/usePlanStore';
import Modal from './Modal';
import axios from 'axios';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

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

const GoogleMap = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { resetStore, schedule } = useScheduleStore();

  const mapRef = useRef(null); // 구글 맵 인스턴스를 참조

  const selectPlaceAction = (place) => {
    setSelectedPlace(place);
    setIsOpen(true);
    console.log('place : ', place);
  };

  const closeAction = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    return resetStore();
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLEMAP_API_KEY}>
      <GoogleMapContainer>
        <SearchContainer>
          <SearchBox select={selectPlaceAction}></SearchBox>
        </SearchContainer>

        <Map
          ref={mapRef} // 구글 맵 인스턴스를 mapRef로 전달
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
        {isOpen && (
          <GoogleMapPlaceDetail
            selectedPlace={selectedPlace}
            isOpen={isOpen}
            close={closeAction}
          ></GoogleMapPlaceDetail>
        )}
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

const SearchBox = ({ select }) => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectTab, setSelectTab] = useState('일정'); // 일정, 검색, 장소

  const [planTitle, setPlanTitle] = useState();
  const [planStartDate, setPlanStartDate] = useState();
  const [planEndDate, setPlanEndDate] = useState();
  const { savePlanDate, schedule, scheduleArrayCreate, removePlaceFromDay } = useScheduleStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  // 일정 탭 기능
  // 날짜 차이 계산 함수
  const calculateDateDifference = () => {
    const start = new Date(planStartDate);
    const end = new Date(planEndDate);
    const timeDifference = end - start;

    // 밀리초 단위로 계산된 날짜 차이를 일(day) 단위로 변환
    const diffInDays = timeDifference / (1000 * 3600 * 24);
    console.log('day : ', diffInDays);
    savePlanDate(diffInDays + 1);
    scheduleArrayCreate();
  };

  useEffect(() => {
    if (planStartDate && planEndDate) {
      calculateDateDifference();
    }
  }, [planStartDate, planEndDate]);

  // 현재 날짜를 yyyy-mm-dd 형식으로 설정
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = (today.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const dd = today.getDate().toString().padStart(2, '0'); // 날짜가 1자리 수일 경우 앞에 0을 추가
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    setPlanStartDate(formattedDate); // state에 날짜 설정
    setPlanEndDate(formattedDate);
  }, []);

  // 검색 탭 기능
  const map = useMap(); // test
  useEffect(() => {
    if (!map) return;
    console.log('map Loading');
  }, [map]);

  // 지도에서 마커를 클릭했을 때 해당 장소의 정보를 설정
  const handleSelectPlace = (place) => {
    // setSelectedPlace(place);
    select(place);

    console.log('location(lat, lng) : ', place.geometry.location.lat(), place.geometry.location.lng());

    // const { lat, lng } = place.geometry.location;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    map.panTo(new window.google.maps.LatLng(lat, lng));
    map.setZoom(17); // 줌 레벨을 변경
  };

  const placesLibrary = useMapsLibrary('places');
  const [placesService, setPlacesService] = useState(null);

  useEffect(() => {
    console.log('maps : ', map);
    console.log('placesLibrary : ', placesLibrary);
    if (!placesLibrary || !map) return;

    // when placesLibrary is loaded, the library can be accessed via the
    // placesLibrary API object
    console.log('서비스');
    setPlacesService(new placesLibrary.PlacesService(map));
  }, [placesLibrary, map]);

  const searchPlaces = () => {
    if (!placesService) return;
    const request = {
      query: searchInputValue,
      fields: ['name', 'geometry', 'place_id'],
    };

    placesService.textSearch(request, (results, status) => {
      console.log(results);
      if (status === 'OK') {
        setPlaces(results);
      }
    });
  };

  const onKeyDownEnter = (e) => {
    if (e.key === 'Enter') {
      // 엔터 키가 눌렸을 때 실행할 동작
      searchPlaces();
    }
  };

  // 장소탭 기능
  function addDaysToStartDate(startDate, index) {
    // startDate는 Date 객체여야 합니다
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + index); // index만큼 날짜를 더합니다.

    // 날짜를 원하는 포맷으로 포맷팅
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = newDate.toLocaleDateString('ko-KR', options); // 한국어 포맷 (yyyy-MM-dd)

    return formattedDate;
  }

  // 장소 삭제
  const deletePlace = (day, placeId) => {
    removePlaceFromDay(day, placeId);
  };

  // 일정 생성시 유효성 검사
  const validate = () => {
    if (!planTitle) {
      return '일정 명을 입력해주세요.';
    }

    if (planStartDate > planEndDate) {
      return '시작일이 종료일보다 늦을 수 없습니다.';
    }

    if (schedule.filter((day) => day.length > 0).length === 0) {
      return '장소가 하나 이상 포함되어야 합니다.';
    }

    if (!user) {
      return '로그인이 필요한 서비스입니다.';
    }

    return ''; // 에러 없으면 빈 문자열 반환
  };

  // 일정 아이디 생성기
  function generateUniqueId() {
    const now = new Date();

    // 년, 월, 일, 시, 분, 초 추출
    const year = now.getFullYear(); // 4자리 연도
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월 (1부터 시작하므로 +1), 2자리로
    const day = String(now.getDate()).padStart(2, '0'); // 일
    const hours = String(now.getHours()).padStart(2, '0'); // 시
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 분
    const seconds = String(now.getSeconds()).padStart(2, '0'); // 초

    // 아이디 형식: yyyyMMddHHmmss
    const uniqueId = `${year}${month}${day}${hours}${minutes}${seconds}`;

    return uniqueId;
  }

  const getFirstImgUrl = () => {
    for (let day of schedule) {
      for (let place of day) {
        if (place.imgUrl) {
          return place.imgUrl; // 첫 번째로 imgUrl을 가진 place의 imgUrl 반환
        }
      }
    }
    return null; // imgUrl이 없으면 null 반환
  };

  // 일정 생성
  const registPlan = async (e) => {
    e.preventDefault();

    const validationError = validate(); // 폼 유효성 검사
    if (validationError) {
      alert(validationError); // 유효성 검사 실패 시 에러 메시지 설정
      return;
    }

    const thumnailUrl = getFirstImgUrl();
    console.log('thumnail : ', thumnailUrl);

    try {
      // 사용자 정보를 json-server로 POST 요청
      const response = await axios.post('http://localhost:5000/plans', {
        id: generateUniqueId(),
        title: planTitle,
        startDate: planStartDate,
        endDate: planEndDate,
        userId: user.id,
        thumnailImg: thumnailUrl,
        schedule: schedule,
      });
      console.log(response);

      // 회원가입 성공 시 로그인 페이지로 이동
      // history.push('/login');
      alert('일정 등록 성공!');
      navigate('/');
    } catch (error) {
      console.log('error : ', error);
      alert('일정 생성 실패. 다시 시도해 주세요.');
    }
    return;
  };

  return (
    <CreatePlanLeftBar>
      <CreatePlanWorkTab>
        <TabItemBox>
          <TabItem onClick={() => setSelectTab('일정')}>일정</TabItem>
          <TabItem onClick={() => setSelectTab('검색')}>검색</TabItem>
          <TabItem onClick={() => setSelectTab('장소')}>장소</TabItem>
        </TabItemBox>
        <TabItem onClick={registPlan}>일정 생성</TabItem>
      </CreatePlanWorkTab>
      <TabContainer>
        {selectTab && selectTab === '일정' && (
          <>
            <TabItemBox>
              <Label>일정명</Label>
              <Input
                type="text"
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                placeholder="일정명을 입력하세요"
              />
            </TabItemBox>
            <TabItemBox>
              <Label>시작 날짜</Label>
              <Input type="date" value={planStartDate} onChange={(e) => setPlanStartDate(e.target.value)} />
            </TabItemBox>

            <TabItemBox>
              <Label>종료 날짜</Label>
              <Input type="date" value={planEndDate} onChange={(e) => setPlanEndDate(e.target.value)} />
            </TabItemBox>
          </>
        )}
        {selectTab && selectTab === '검색' && (
          <>
            <SearchMode>
              <SearchBar
                type="text"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                placeholder="검색할 장소 입력"
                onKeyDown={onKeyDownEnter}
              />
              <SearchBtn onClick={searchPlaces}>
                <FaSearch />
              </SearchBtn>
            </SearchMode>

            {places.length > 0 && (
              <SearchResultList>
                {places.map((place) => (
                  // <li key={place.place_id} onClick={() => handleSelectPlace(place)}>
                  //   {place.name}
                  // </li>
                  <SearchResultItem key={place.place_id}>
                    <GoogleMapPlaceItem
                      id={place.place_id}
                      placeName={place.name}
                      address={place.formatted_address}
                      photos={place.photos}
                      onClickEvent={() => handleSelectPlace(place)}
                    ></GoogleMapPlaceItem>
                  </SearchResultItem>
                ))}
              </SearchResultList>
            )}
          </>
        )}
        {selectTab && selectTab === '장소' && (
          <>
            {schedule.map((days, dayIndex) => {
              return (
                <DaysBox>
                  <div>{dayIndex + 1}일차</div>
                  <p>날짜 : {addDaysToStartDate(planStartDate, dayIndex)}</p>
                  {days.map((place, index) => {
                    return (
                      <PlaceItemContainer>
                        <PlaceItemImg src={place.imgUrl} />
                        <PlaceItemInfo>
                          <div>{index + 1}번</div>
                          <PlaceItemTitle>{place.name}</PlaceItemTitle>
                          <PlaceItemAddress>{place.address}</PlaceItemAddress>
                        </PlaceItemInfo>
                        <DeleteButton onClick={() => deletePlace(dayIndex + 1, place.id)}>
                          <FaTrashAlt />
                        </DeleteButton>
                      </PlaceItemContainer>
                    );
                  })}
                </DaysBox>
              );
            })}
          </>
        )}
      </TabContainer>
    </CreatePlanLeftBar>
  );
};

export default GoogleMap;

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

// 검색으로 나온 장소들
const GoogleMapPlaceItem = ({ id, placeName, address, photos, onClickEvent }) => {
  const imgUrl = useMemo(() => {
    if (photos && photos.length > 0) {
      const options = {
        maxHeight: 200,
        maxWidth: 200,
      };
      const imgUrl = photos[0].getUrl(options);
      console.log('imgUrl : ', imgUrl);
      return imgUrl;
    } else {
      return '';
    }
  }, [id]);

  return (
    <PlaceItemContainer onClick={onClickEvent}>
      <PlaceItemImg src={imgUrl} />
      <PlaceItemInfo>
        <PlaceItemTitle>{placeName}</PlaceItemTitle>
        <PlaceItemAddress>{address}</PlaceItemAddress>
      </PlaceItemInfo>
    </PlaceItemContainer>
  );
};

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
  const { planDays, addPlaceToDay, schedule } = useScheduleStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addPlace = () => {
    const day = document.getElementById('selectDay').value;
    console.log('day : ', day);

    addPlaceToDay(day, {
      id: selectedPlace.place_id,
      name: selectedPlace.name,
      address: selectedPlace.formatted_address,
      lat: selectedPlace.geometry.location.lat(),
      lng: selectedPlace.geometry.location.lng(),
      imgUrl: imgUrl,
    });
    console.log('schedule : ', schedule);
    closeModal();
  };

  // const map = useMap();
  // const placesLibrary = useMapsLibrary('places');
  // const [placeDetail, setPlaceDetail] = useState(null);
  // useEffect(() => {
  //   if (!selectedPlace) {
  //     return;
  //   }
  //   new placesLibrary.PlacesService(map).getDetails({ placeId: selectedPlace.place_id }, (results, status) => {
  //     console.log('results :', results);
  //   });
  // }, []);

  return (
    <>
      <DetailTabContainer>
        <DetailPlaceImg src={imgUrl} />
        <CloseButton onClick={close}>X</CloseButton>
        <div style={{ paddingLeft: '10px' }}>
          <DetailPlaceTitle>{selectedPlace?.name}</DetailPlaceTitle>
          <div>{selectedPlace?.formatted_address}</div>
        </div>
        <AddButton onClick={openModal}>장소 추가</AddButton>

        <Modal isOpen={isModalOpen} onClose={closeModal} title={'장소추가'}>
          <p>원하는 날에 추가</p>
          <select name="" id="selectDay">
            {new Array(planDays).fill(null).map((_, index) => (
              <option value={index + 1}>{index + 1}일차</option>
            ))}
          </select>
          <button onClick={addPlace}>추가</button>
        </Modal>
      </DetailTabContainer>
    </>
  );
};
