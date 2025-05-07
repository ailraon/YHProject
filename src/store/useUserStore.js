import {create} from 'zustand';

// Zustand store 정의
const useUserStore = create((set) => ({
  user: null, // 유저 정보 (로그인 후 저장)
  isLoggedIn: false, // 로그인 여부

  // 로그인 처리
  login: (userInfo) => set({ user: userInfo, isLoggedIn: true }),

  // 로그아웃 처리
  logout: () => set({ user: null, isLoggedIn: false }),

  // 유저 정보 설정
  setUser: (userInfo) => set({ user: userInfo }),
}));

export default useUserStore;

