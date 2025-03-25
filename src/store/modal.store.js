import { create } from "zustand";

const useModalStore = create((set)=>({
    isOpen:false,
    window:'',
    member:undefined,
    open: (settedWindow, settedMember) => set({ isOpen: true, window:settedWindow, member:settedMember}),
    close: (settedWindow) => set({isOpen: false, window:settedWindow, member:undefined})
}))

export default useModalStore