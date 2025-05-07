import React, { useState, useEffect, useMemo } from "react";
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

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

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLEMAP_API_KEY}>
      <GoogleMapContainer>
        <SearchContainer>
          <SearchBox></SearchBox>
        </SearchContainer>

        <Map
          defaultCenter={{ lat: 35.907757, lng: 127.766922}}
          defaultZoom={8}
          gestureHandling="greedy"
          disableDefaultUI={true}
        >
        </Map>

        
      </GoogleMapContainer>
    </APIProvider>
  );
};

const SearchMode = styled.div`
  display: flex;
  padding: 15px;

  border: 1px solid gray;
  border-radius: 20px;
`

const SearchBar = styled.input`
  width: 100%;
  border: 0;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`

const SearchBtn = styled.button`
  border: 0;
  background-color: unset;
  cursor: pointer;
`

const SearchResultList = styled.ul`
  padding: 0;
  list-style: none;
  height: calc(100vh - 200px);
  overflow-y:scroll;
`

const SearchResultItem = styled.li`
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
`

const CreatePlanLeftTab = styled.div`
  width: 500px;
  display: flex;
`

const CreatePlanWorkTab = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const SearchBox = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectTab, setSelectTab] = useState(""); // 일정, 검색, 장소  

  const map = useMap(); // test
  useEffect (() => {
    if (!map) return;
    console.log("map Loading");
  }, [map]);

  // 지도에서 마커를 클릭했을 때 해당 장소의 정보를 설정
  const handleSelectPlace = (place) => {
    setSelectedPlace(place);

    console.log("location(lat, lng) : " , place.geometry.location.lat(), place.geometry.location.lng());

    // const { lat, lng } = place.geometry.location;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    map.panTo(new window.google.maps.LatLng(lat, lng));
    map.setZoom(14); // 줌 레벨을 변경
  };

  const placesLibrary = useMapsLibrary('places');
  const [placesService, setPlacesService] = useState(null);

  useEffect(() => {
    console.log("maps : ", map);
    console.log("placesLibrary : ", placesLibrary);
    if (!placesLibrary || !map) return;

    // when placesLibrary is loaded, the library can be accessed via the
    // placesLibrary API object
    console.log("서비스");
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
      if (status === "OK") {
        setPlaces(results);
      }
    });
  }

  const onKeyDownEnter = (e) => {
    if (e.key === 'Enter') {
      // 엔터 키가 눌렸을 때 실행할 동작
      searchPlaces();
    }
  }

  return (
    <CreatePlanLeftTab>
      <CreatePlanWorkTab>
        <div>
          <div>일정</div>
          <div>검색</div>
          <div>장소</div>
        </div>
        <div>
          일정 생성
        </div>
      </CreatePlanWorkTab>
      <div>
        <SearchMode>
          <SearchBar
            type="text"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            placeholder="검색할 장소 입력"
            onKeyDown={onKeyDownEnter}
          />
          <SearchBtn onClick={searchPlaces}><FaSearch /></SearchBtn>
        </SearchMode>
        
        {places.length > 0 && (
          <SearchResultList>
            {places.map((place) => (
              // <li key={place.place_id} onClick={() => handleSelectPlace(place)}>
              //   {place.name}
              // </li>
              <SearchResultItem>
                <GoogleMapPlaceItem 
                  key={place.place_id}
                  id={place.place_id}
                  placeName={place.name}
                  address={place.formatted_address}
                  lat={place.geometry.location.lat()}
                  lng={place.geometry.location.lng()}
                  photos={place.photos}
                  onClickEvent={() => handleSelectPlace(place)}
                ></GoogleMapPlaceItem>
              </SearchResultItem>
            ))}
          </SearchResultList>
        )}
      </div>
    </CreatePlanLeftTab>
  )
}

export default GoogleMap;

const PlaceItemContainer = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
`

const PlaceItemImg = styled.img`
  max-width: 120px;
  min-width: 120px;
  max-height: 80px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
`

const PlaceItemInfo = styled.div`
`

const PlaceItemTitle = styled.h3`
  margin: 0;
`

const PlaceItemAddress = styled.p`
  
`


// 검색으로 나온 장소들
const GoogleMapPlaceItem = ({id, placeName, address, lat, lng, photos, onClickEvent}) => {

  const imgUrl = useMemo(() => {
    if(photos && photos.length > 0) {
      const options = {
        maxHeight: 200,
        maxWidth: 200,
      };
      const imgUrl = photos[0].getUrl(options);
      console.log("imgUrl : ", imgUrl);
      return imgUrl
    } else {
      return "";
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
  )
}
