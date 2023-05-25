import { create } from "zustand";

interface PassordModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePassordModal = create<PassordModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePassordModal;
