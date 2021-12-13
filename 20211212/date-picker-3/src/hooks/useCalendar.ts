import dayjs from 'dayjs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import CustomDate from '../customs/CustomDate';

import { calendarState } from '../state';

export default function useCalendarState() {
  const state = useRecoilValue(calendarState);
  const setState = useSetRecoilState(calendarState);

  const {
    year, month, isCalendarOpen,
  } = state;

  const moveToNextMonth = () => {
    const next = dayjs(`${year}-${month}`).add(1, 'month');

    setState({
      ...state,
      year: next.year(),
      month: next.month() + 1,
    });
  };

  const moveToPreviousMonth = () => {
    const previous = dayjs(`${year}-${month}`).subtract(1, 'month');

    setState({
      ...state,
      year: previous.year(),
      month: previous.month() + 1,
    });
  };

  const openCalendar = () => {
    setState({
      ...state,
      isCalendarOpen: true,
    });
  };

  const closeCalendar = () => {
    setState({
      ...state,
      isCalendarOpen: false,
    });
  };

  const pickDay = (day: Date) => {
    setState({
      ...state,
      date: new CustomDate(day.toString()),
    });
  };

  return {
    state,
    isCalendarOpen,
    moveToNextMonth,
    moveToPreviousMonth,
    openCalendar,
    closeCalendar,
    pickDay,
  };
}
