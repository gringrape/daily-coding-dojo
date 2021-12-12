import { fireEvent, render } from '@testing-library/react';

import Calendar from './Calendar';

describe('Calendar', () => {
  it('listens click next event', async () => {
    const { getByText, container } = render((
      <Calendar year={2021} month={11} />
    ));

    fireEvent.click(getByText('다음'));
    fireEvent.click(getByText('다음'));
    fireEvent.click(getByText('다음'));

    expect(container).toHaveTextContent('2022 년 2 월');
  });

  it('listens click previous event', () => {
    const { getByText, container } = render((
      <Calendar year={2021} month={11} />
    ));

    fireEvent.click(getByText('이전'));
    fireEvent.click(getByText('이전'));

    expect(container).toHaveTextContent('2021 년 9 월');
  });

  it('listens click day event', () => {
    const { getByText, container } = render((
      <Calendar year={2021} month={11} />
    ));

    fireEvent.click(getByText('3'));

    expect(container).toHaveTextContent('2021 년 11 월 3 일');
  });
});
