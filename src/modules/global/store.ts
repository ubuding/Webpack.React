import { create } from "zustand";

interface State {
  count: number;
  increase: (value: number) => void;
  decrease: () => void;
  clear: () => void;
  double: () => number;
}

export const useGlobalStore = create<State>((set, get) => ({
  count: 0,
  increase: (value) => set(() => ({ count: value })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  clear: () => set({ count: 0 }),
  double: () => get().count * 2,
}));
