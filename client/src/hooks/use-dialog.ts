import { create } from 'zustand';
interface IStateDialog {
    isOpen: boolean;
    openDialog: (title?:React.ReactElement | null, description?: React.ReactElement) => void;
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
    openDialog: (title?:React.ReactElement | null, description?: React.ReactElement) => set((state) => ({ isOpen: true, title, description })),
    closeDialog: () => set((state) => ({ isOpen: false })),
    onFinish: () => {},
    setOnFinish: (fn) => set((state) => ({ onFinish: fn })),
    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
}));
