import create from 'zustand';

// 장소 객체
// id: 장소 ID, name: 장소 이름, address: 장소 주소, lat: 위도, lng: 경도, imgUrl: 이미지 URL
const useScheduleStore = create((set) => ({
  schedule: [], // 날짜별 일정 (2차원 배열)
  
  // 특정 날짜에 장소 추가
  addPlaceToDay: (day, place) => {
    set((state) => {
      const newSchedule = [...state.schedule];
      if (!newSchedule[day - 1]) {
        newSchedule[day - 1] = []; // 날짜 배열이 없으면 새로 생성
      }
      newSchedule[day - 1].push(place); // 장소 추가
      return { schedule: newSchedule };
    });
  },

  // 특정 날짜에서 장소 삭제
  removePlaceFromDay: (day, placeId) => {
    set((state) => {
      const newSchedule = [...state.schedule];
      if (newSchedule[day - 1]) {
        newSchedule[day - 1] = newSchedule[day - 1].filter(place => place.id !== placeId); // 해당 장소 삭제
      }
      return { schedule: newSchedule };
    });
  },

  // 특정 날짜에서 장소의 위치 변경 (장소 순서 변경)
  updatePlaceOrder: (day, oldIndex, newIndex) => {
    set((state) => {
      const newSchedule = [...state.schedule];
      if (newSchedule[day - 1] && oldIndex !== newIndex) {
        const movedPlace = newSchedule[day - 1].splice(oldIndex, 1)[0];
        newSchedule[day - 1].splice(newIndex, 0, movedPlace); // 장소의 순서 변경
      }
      return { schedule: newSchedule };
    });
  },
}));

export default useScheduleStore;
