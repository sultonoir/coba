import { create } from "zustand";

interface EditnModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditnModal = create<EditnModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditnModal;
