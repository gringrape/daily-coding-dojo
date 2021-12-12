import { render } from '@testing-library/react';

import Month from './Month';

describe('Month', () => {
  it('renders current month', () => {
    const { container } = render((
      <Month
        year="2019"
        month="3"
        onClickDay={() => {}}
      />
    ));

    expect(container).toHaveTextContent('2019 년 3 월');
  });
});
