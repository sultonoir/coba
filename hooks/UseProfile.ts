import { create } from "zustand";

interface ProfileState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProfile = create<ProfileState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useProfile;
