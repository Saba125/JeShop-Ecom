import { create } from 'zustand';
interface IStateDialog {
    isOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
    onFinish?: () => void;
    setOnFinish: (fn: () => void) => void;
    title: React.ReactElement | null;
    setTitle: (title: React.ReactElement) => void;
    description: React.ReactElement | null;
    setDescription: (description: React.ReactElement) => void;
}
export const useDialog = create<IStateDialog>()((set) => ({
    title: null,
    description: null,
    isOpen: false,
    openDialog: () => set((state) => ({ isOpen: true })),
    closeDialog: () => set((state) => ({ isOpen: false })),
    onFinish: () => {},
    setOnFinish: (fn) => set((state) => ({ onFinish: fn })),
    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
}));
