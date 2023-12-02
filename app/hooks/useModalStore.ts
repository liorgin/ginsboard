import { create } from "zustand";

export interface ModalProps {
  children: React.ReactNode;
  timeout?: number;
}

export interface ModalStore {
  isOpen: boolean;
  props: ModalProps;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>()((set, get) => ({
  isOpen: false,
  props: { children: null },
  openModal: (props: ModalProps) => set({ props: props, isOpen: true }),
  closeModal: () => set({ isOpen: false, props: { children: null } }),
}));

export default useModalStore;
