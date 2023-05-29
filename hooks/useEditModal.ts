import { create } from "zustand";

interface EditnModalState {
  isOpen: boolean;
  openId: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useEditnModal = create<EditnModalState>((set) => ({
  isOpen: false,
  openId: null,
  onOpen: (id) => set({ isOpen: true, openId: id }),
  onClose: () => set({ isOpen: false, openId: null }),
}));

export default useEditnModal;
