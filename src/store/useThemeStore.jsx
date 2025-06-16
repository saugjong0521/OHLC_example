import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: 'light', // 또는 'dark'
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
}));
