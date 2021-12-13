import dayjs from 'dayjs';

import { useState } from 'react';

import styled from 'styled-components';

const Panel = styled.div`
`;

export default function Calendar() {
  const [state] = useState({
    year: 2021,
    month: 12,
  });

  const { year, month } = state;

  const days = [...Array(dayjs(`${year}-${month}`).daysInMonth()).keys()]
    .map((i) => i + 1);

  return (
    <>
      <Panel>
        <h4>{`${month}월 ${year}`}</h4>
      </Panel>
      <div>
        {days.map((day) => (
          <button key={day} type="button">{day}</button>
        ))}
      </div>
    </>
  );
}
