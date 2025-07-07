import { create } from 'zustand'

type LoadingState = {
    loading: Boolean;
    setLoading: (val: Boolean) => void;
};

export const useLoadingStore = create<LoadingState>((set) => ({
    loading: false,
    setLoading: (val) => set({ loading: val })
}))