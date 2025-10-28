import { create } from 'zustand'
interface IStateDialog {
    isOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
    onFinish?: () => void;
    setOnFinish: (fn: () => void) => void;
    title: string;
    setTitle: (title: string) => void;

}
export const useDialog = create<IStateDialog>()((set) => ({
    title: "",
    isOpen: false,
    openDialog: () => set((state) => ({isOpen: true})),
    closeDialog: () => set((state) => ({isOpen: false})),
    onFinish: () => {},
    setOnFinish: (fn) => set((state) => ({onFinish: fn})),
    setTitle: (title) => set({title})
}));
