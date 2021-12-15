import { render, fireEvent } from '@testing-library/react';

import Calendar from './Calendar';

const moveToPreviousMonth = jest.fn();
const moveToNextMonth = jest.fn();
const pickDay = jest.fn();

jest.mock('../hooks/useCalendar', () => () => ({
  state: {
    year: 2021,
    month: 11,
  },
  moveToPreviousMonth,
  moveToNextMonth,
  pickDay,
}));

describe('Calendar', () => {
  const handleClickDay = jest.fn();

  function renderCalendar(shouldDisableDate: (day: Date) => boolean = () => false) {
    return render(<Calendar shouldDisableDate={shouldDisableDate} />);
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', () => {
    const { container } = renderCalendar();

    expect(container).toHaveTextContent('11월 2021');
  });

  it('renders days', () => {
    const { queryAllByText } = renderCalendar();

    const days = [...Array(30).keys()].map((i) => `${i + 1}`);

    days.forEach((day) => {
      const [dayElement] = queryAllByText(day);

      expect(dayElement).toBeVisible();
    });
  });

  it('listens click "이전" button', () => {
    const { getByText } = renderCalendar();

    fireEvent.click(getByText('이전'));

    expect(moveToPreviousMonth).toBeCalled();
  });

  it('listens click "다음" button', () => {
    const { getByText } = renderCalendar();

    fireEvent.click(getByText('다음'));

    expect(moveToNextMonth).toBeCalled();
  });

  it('listens click day event', () => {
    const { getByText } = renderCalendar();

    fireEvent.click(getByText('13'));

    expect(pickDay).toBeCalled();

    const day = pickDay.mock.calls[0][0];

    expect(day.getDate()).toBe(13);
  });

  it('cannot click disabled date', () => {
    const { getByText } = renderCalendar((day) => day > new Date('2021-11-13'));

    fireEvent.click(getByText('15'));

    expect(pickDay).not.toBeCalled();

    fireEvent.click(getByText('7'));
    fireEvent.click(getByText('8'));

    expect(pickDay).toBeCalledTimes(2);
  });
});
