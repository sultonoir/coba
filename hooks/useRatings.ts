import { create } from "zustand";

interface RatingsModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRatingsModal = create<RatingsModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRatingsModal;
