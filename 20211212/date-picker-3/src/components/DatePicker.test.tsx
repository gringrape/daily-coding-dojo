import { fireEvent, render } from '@testing-library/react';
import CustomDate from '../customs/CustomDate';

import DatePicker from './DatePicker';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useState: () => [new CustomDate('2021-11-23')],
  };
});

jest.mock('dayjs', () => () => ({
  daysInMonth: () => 31,
}));

describe('DatePicker', () => {
  it('renders current year and month', () => {
    const { container } = render(<DatePicker />);

    expect(container).toHaveTextContent('2021');
    expect(container).toHaveTextContent('화, 11 월 23');
  });

  it('renders open button with current date', () => {
    const { getByText } = render(<DatePicker />);

    fireEvent.click(getByText('2021 년 11 월 23 일'));
  });
});
