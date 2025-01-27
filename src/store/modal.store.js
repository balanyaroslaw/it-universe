import { create } from "zustand";

const useModalStore = create((set)=>({
    isOpen:false,
    window:'',
    open: (settedWindow) => set({ isOpen: true, window:settedWindow}),
    close: (settedWindow) => set({isOpen: false, window:settedWindow})
}))

export default useModalStore