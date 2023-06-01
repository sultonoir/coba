import { create } from "zustand";

interface ReservModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReservModal = create<ReservModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReservModal;
