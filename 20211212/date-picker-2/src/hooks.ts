import { useSetRecoilState, useRecoilValue } from 'recoil';

import dayjs from 'dayjs';

import { dateState } from './state';

export function useDates() {
  const state = useRecoilValue(dateState);
  const setCurrentDate = useSetRecoilState(dateState);

  const { month, year } = state;

  const setDate = (date: Date) => {
    setCurrentDate({
      ...state,
      date,
    });
  };

  const nextMonth = () => {
    const thisMonth = dayjs(`${year}-${month}`);
    const next = thisMonth.add(1, 'month');

    setCurrentDate({
      ...state,
      month: next.get('month') + 1,
      year: next.get('year'),
    });
  };

  const prevMonth = () => {
    const thisMonth = dayjs(`${year}-${month}`);
    const prev = thisMonth.subtract(1, 'month');

    setCurrentDate({
      ...state,
      month: prev.get('month') + 1,
      year: prev.get('year'),
    });
  };

  return {
    state,
    nextMonth,
    prevMonth,
    setDate,
  };
}

export default {};
