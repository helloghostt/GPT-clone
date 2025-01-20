import { ReactNode } from "react";
import { create } from "zustand";

type ModalConfig = {
  title: string;
  description?: string;
  content?: ReactNode;
  footer: ReactNode;
};

type State = {
  open: boolean;
  config: ModalConfig | null;
};

type Action = {
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
};

const initialState: State = {
  open: false,
  config: null,
};

const useModalStore = create<State & Action>((set) => ({
  ...initialState,
  openModal: (config) => set({ open: true, config }),
  closeModal: () => set(initialState),
}));

export { useModalStore };
