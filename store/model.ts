//상태관리
import { create } from "zustand";

type State = {
  model: string;
};

type Action = {
  updateModel: (model: State["model"]) => void;
};

const useModelStore = create<State & Action>((set) => ({
  model: "gpt-3.5-turbo",
  updateModel: (model) =>
    set((state) => {
      if (state.model !== model) {
        console.log(`Model updated from ${state.model} to ${model}`); // 상태 변화 로깅
        return { model };
      }
      return state; // 상태가 동일하면 변경하지 않음
    }),
}));

export { useModelStore };
