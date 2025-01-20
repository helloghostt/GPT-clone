//상태관리
import { create } from "zustand";

type State = {
  open: boolean;
};

type Action = {
  setOpen: (open: State["open"]) => void;
};

const useSheetStore = create<State & Action>((set) => ({
  open: false,
  setOpen: (open) =>
    set((state) => {
      if (state.open !== open) {
        console.log(`Model updated from ${state.open} to ${open}`); // 상태 변화 로깅
        return { open };
      }
      return state; // 상태가 동일하면 변경하지 않음
    }),
}));

export { useSheetStore };
