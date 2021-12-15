import { atom } from 'recoil';

import CustomDate from './customs/CustomDate';

export interface CalenderState {
  year: number;
  month: number;
  isCalendarOpen: boolean;
  date: CustomDate;
}

export const calendarState = atom<CalenderState>({
  key: 'calendarState',
  default: {
    year: new CustomDate().getFullYear(),
    month: new CustomDate().getMonth(),
    isCalendarOpen: false,
    date: new CustomDate(),
  },
});
