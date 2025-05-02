import { create } from 'zustand';

const useCounterStore = create((set, get) => ({
  count: 0,
  // set의 콜백으로 상태를 바로 업데이트 (불변성 보장)
  increase: () => set((state) => ({ count: state.count + 1 })),
  // get()으로 현재 상태값을 직접 읽어서 업데이트
  decrease: () => set({ count: get().count - 1 }),
}));

export default useCounterStore;
