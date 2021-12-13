import { render } from '@testing-library/react';

import Calendar from './Calendar';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useState: () => [{
      year: 2021,
      month: 11,
    }],
  };
});

describe('Calendar', () => {
  it('renders title', () => {
    const { container } = render(<Calendar />);

    expect(container).toHaveTextContent('11월 2021');
  });

  it('renders days', () => {
    const { queryByText } = render(<Calendar />);

    const days = [...Array(30).keys()].map((i) => `${i + 1}`);

    days.forEach((day) => {
      expect(queryByText(day)).toBeInTheDocument();
    });
  });
});
