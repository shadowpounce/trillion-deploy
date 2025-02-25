import { create } from 'zustand';

interface Language {
  label: string;
  value: string;
}

interface LanguageState {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: { label: 'English', value: 'en' },
  setLang: (lang) => set({ lang }),
}));
