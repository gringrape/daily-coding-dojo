import styled from 'styled-components';

import { useLayoutEffect, useRef } from 'react';

import CustomDate from '../customs/CustomDate';
import Calendar from './Calendar';

import useClickOutside from '../hooks/useClickOutside';
import useCalendar from '../hooks/useCalendar';

const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  background-color: rgba(0,0,0,0.5);
`;

const Modal = styled.div`
  width: 310px;
  height: 480px;
  background-color: white;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function DatePicker({
  current = new Date(),
  shouldDisableDate = (day: Date) => false,
  onConfirm = () => {},
} : {
  current?: Date;
  shouldDisableDate?: (day: Date) => boolean;
  onConfirm?: (date: Date) => void;
}) {
  const {
    state,
    openCalendar,
    closeCalendar,
    pickDay,
  } = useCalendar();

  const { date, isCalendarOpen } = state;

  const handleClickCancel = () => {
    pickDay(current);
    closeCalendar();
  };

  const handleClickConfirm = () => {
    onConfirm(date.toDate());
    closeCalendar();
  };

  const ref = useRef(null);
  useClickOutside(ref, () => handleClickCancel());

  useLayoutEffect(() => {
    pickDay(current);
  }, [isCalendarOpen]);

  const dateString = CustomDate.from(current).toString();

  const [year, weekDay, month, day] = [
    date.getFullYear(),
    date.getWeekDay(),
    date.getMonth(),
    date.getDate(),
  ];

  return (
    <>
      <button type="button" onClick={openCalendar}>
        {dateString}
      </button>
      <Overlay visible={isCalendarOpen}>
        <Modal ref={ref}>
          <div>
            <p>{year}</p>
            <p>{`${weekDay}, ${month} 월 ${day}`}</p>
          </div>
          <Calendar shouldDisableDate={shouldDisableDate} />
          <Footer>
            <button type="button" onClick={handleClickCancel}>
              취소
            </button>
            <button type="button" onClick={handleClickConfirm}>
              확인
            </button>
          </Footer>
        </Modal>
      </Overlay>
    </>
  );
}
