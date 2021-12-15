/* eslint-disable no-unused-vars */
import styled from 'styled-components';

import CustomDate from '../customs/CustomDate';

import { getWeeks, isInMonth } from '../dateUtils';

import useCalendarState from '../hooks/useCalendar';

const Panel = styled.div`
  display: flex;
`;

const Label = styled.div`
`;

export default function Calendar({ shouldDisableDate }: {
  shouldDisableDate: (day: Date) => boolean;
}) {
  const {
    state,
    moveToPreviousMonth,
    moveToNextMonth,
    pickDay,
  } = useCalendarState();

  const { year, month } = state;

  const weeks = getWeeks(year, month);

  // TODO: delete this -> substitue with styled component
  const dayStyle = (day: Date): any => (isInMonth(day, year, month) ? ({
    width: '36px',
    height: '36px',
  }) : ({
    width: '36px',
    height: '36px',
    visibility: 'hidden',
  }));

  return (
    <>
      <Panel>
        <button type="button" onClick={moveToPreviousMonth}>
          이전
        </button>
        <h4>{`${month}월 ${year}`}</h4>
        <button type="button" onClick={moveToNextMonth}>
          다음
        </button>
      </Panel>
      <div>
        <Label>
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </Label>
        {weeks.map((week) => (
          <div key={week.map((i) => i.getDate()).join(',')}>
            {week.map((day) => (
              <button
                key={day.toISOString()}
                style={dayStyle(day)}
                type="button"
                disabled={shouldDisableDate(day)}
                onClick={() => pickDay(day)}
              >
                {day.getDate()}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
