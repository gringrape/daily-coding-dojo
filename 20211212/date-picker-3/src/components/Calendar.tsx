/* eslint-disable no-unused-vars */
import styled, { css } from 'styled-components';
import CustomDate from '../customs/CustomDate';

import { getWeeks, isInMonth, isSameDate } from '../dateUtils';

import useCalendarState from '../hooks/useCalendar';

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 8px;

  & > button {
    width: 48px;
    height: 48px;
  }

  & > p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.938;
  }
`;

const LabelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 16px;

  & > span {
    color: rgba(0, 0, 0, 0.38);
    font-size: 0.75rem;
    width: 36px;
    margin: 0 2px;
    text-align: center;
  }
`;

const Month = styled.div`
  min-height: 216px;
  margin-top: 12px;
`;

const Week = styled.div`
  display: flex;
  justify-content: center;
`;

const Day = styled.button<{ selected: boolean, visible: boolean, isCurrent: boolean }>`
  margin: 0 2px;
  width: 36px;
  height: 36px;
  background-color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: background-color .3s;
  border-radius: 50%;

  &:hover {
    background-color: #eee;
  }

  ${({ selected }) => selected && css`
    background-color: #ff7700;
    color: white;
    
    &:hover {
      background-color: #ff7700;
    }
  `}

  ${({ visible }) => !visible && css`
    visibility: hidden;
  `}

  ${({ isCurrent }) => isCurrent && css`
    color: #ff7700;
  `}

  ${({ selected, isCurrent }) => selected && isCurrent && css`
    color: white;
  `}
`;

export default function Calendar({ shouldDisableDate, currentDate }: {
  currentDate: Date,
  shouldDisableDate: (day: Date) => boolean;
}) {
  const {
    state,
    moveToPreviousMonth,
    moveToNextMonth,
    pickDay,
  } = useCalendarState();

  const { date, year, month } = state;

  const weeks = getWeeks(year, month);

  const isPicked = (day: Date) => CustomDate.from(day).toString() === date.toString();

  return (
    <>
      <Panel>
        <button type="button" onClick={moveToPreviousMonth}>
          이전
        </button>
        <p>{`${month}월 ${year}`}</p>
        <button type="button" onClick={moveToNextMonth}>
          다음
        </button>
      </Panel>
      <div>
        <LabelHeader>
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </LabelHeader>
        <Month>
          {weeks.map((week) => (
            <Week key={week.map((i) => i.getDate()).join(',')}>
              {week.map((day) => (
                <Day
                  key={day.toISOString()}
                  isCurrent={isSameDate(day, currentDate)}
                  selected={isPicked(day)}
                  visible={isInMonth(day, year, month)}
                  type="button"
                  disabled={shouldDisableDate(day)}
                  onClick={() => pickDay(day)}
                >
                  {day.getDate()}
                </Day>
              ))}
            </Week>
          ))}
        </Month>
      </div>
    </>
  );
}
