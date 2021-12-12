import { useState } from 'react';
import Month from './Month';

export default function Calendar({ year, month } : {
  year: number;
  month: number;
}) {
  const [state, setState] = useState({
    year,
    month,
    day: 3,
    selected: '',
  });

  const handleClickNext = () => {
    setState(({ month: m, year: y }) => ({
      ...state,
      month: m === 12 ? 1 : m + 1,
      year: m === 12 ? y + 1 : y,
    }));
  };

  const handleClickPrev = () => {
    setState(({ month: m, year: y }) => ({
      ...state,
      month: m === 1 ? 12 : m - 1,
      year: m === 1 ? y - 1 : y,
    }));
  };

  const handleClickDay = (day: number) => {
    setState(({
      ...state,
      day,
      selected: `${year} 년 ${month} 월 ${day} 일`,
    }));
  };

  return (
    <>
      <button type="button" onClick={handleClickPrev}>
        이전
      </button>
      <button type="button" onClick={handleClickNext}>
        다음
      </button>
      <h1>
        {state.selected}
      </h1>
      <Month
        year={state.year.toString()}
        month={state.month.toString()}
        onClickDay={handleClickDay}
      />
    </>
  );
}
