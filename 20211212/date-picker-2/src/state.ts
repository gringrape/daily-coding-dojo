import { atom } from 'recoil';

export const dateState = atom<{
  date: Date | null;
  year: number;
  month: number;
}>({
  key: 'dateState',
  default: {
    date: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },
});

export const xx = '';
