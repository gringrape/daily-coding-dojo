import { useState } from 'react';

import styled from 'styled-components';

import CustomDate from '../customs/CustomDate';
import Calendar from './Calendar';

const Modal = styled.div`
`;

export default function DatePicker() {
  const [date] = useState(new CustomDate());

  return (
    <>
      <button type="button">
        {date.toString()}
      </button>
      <Modal>
        <div>
          <p>{date.getFullYear()}</p>
          <p>{`${date.getWeekDay()}, ${date.getMonth()} 월 ${date.getDate()}`}</p>
        </div>
        <Calendar />
      </Modal>
    </>
  );
}
