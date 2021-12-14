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
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px;
  height: 100px;
  background-color: #ff7000;
  
  & p {
    margin: 0;
    padding: 0;
  }

  & .year {
    font-size: 1rem;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.54);
  }

  & .datestring {
    font-size: 2.125rem;
    line-height: 1.235;
    color: #ffffff;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px;

  & > button {
    margin-left: 8px;
    padding: 6px 8px;
    min-width: 64px;
    color: #ff7000;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
  }
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
          <Header>
            <p className="year">{year}</p>
            <p className="datestring">{`${weekDay}, ${month}월 ${day}`}</p>
          </Header>
          <Calendar
            currentDate={current}
            shouldDisableDate={shouldDisableDate}
          />
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
