import { create } from "zustand";

export const useChatStore = create<{
  active: boolean;
  toggle: () => void;
  reset: () => void;
}>((set) => ({
  active: false,
  toggle: () => set(({ active }) => ({ active: !active })),
  reset: () => set({ active: false }),
}));
