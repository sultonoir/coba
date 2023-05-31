import { create } from "zustand";

interface HeroModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useHeroModal = create<HeroModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useHeroModal;
