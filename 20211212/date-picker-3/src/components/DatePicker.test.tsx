/* eslint-disable no-unused-vars */
import { fireEvent, render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import CustomDate from '../customs/CustomDate';

import DatePicker from './DatePicker';

const openCalendar = jest.fn();
const closeCalendar = jest.fn();
const pickDay = jest.fn();

jest.mock('../hooks/useCalendar', () => () => ({
  state: {
    date: new CustomDate('2021-11-23'),
    year: 2019,
    month: 11,
    isCalendarOpen: false,
  },
  openCalendar,
  closeCalendar,
  pickDay,
}));

describe('DatePicker', () => {
  const handleConfirm = jest.fn();

  function renderDatePicker(
    date :Date = new Date(), shouldDisableDate? :(day: Date) => boolean,
  ) {
    return render(
      <RecoilRoot>
        <DatePicker
          current={date}
          shouldDisableDate={shouldDisableDate}
          onConfirm={handleConfirm}
        />
      </RecoilRoot>,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders open button with current date', () => {
    const { getByText } = renderDatePicker(new Date('2021-11-23'));

    fireEvent.click(getByText('2021 년 11 월 23 일'));
  });

  it('renders current year and month', () => {
    const { container } = renderDatePicker();

    expect(container).toHaveTextContent('2021');
    expect(container).toHaveTextContent('화, 11월 23');
  });

  it('listens click open button', () => {
    const { getByText } = renderDatePicker(new Date('2021-11-23'));

    fireEvent.click(getByText('2021 년 11 월 23 일'));

    expect(openCalendar).toBeCalled();
  });

  it('listens click "취소" button', () => {
    const { getByText } = renderDatePicker(new Date('2021-11-23'));

    fireEvent.click(getByText('취소'));

    expect(closeCalendar).toBeCalled();
    expect(handleConfirm).not.toBeCalled();
  });

  it('listens click "확인" button', () => {
    const { getByText } = renderDatePicker(new Date('2021-11-23'));

    fireEvent.click(getByText('확인'));

    expect(closeCalendar).toBeCalled();
    expect(handleConfirm).toBeCalled();
  });
});
