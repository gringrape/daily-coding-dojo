import { fireEvent, render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import App from './App';

describe('App', () => {
  it('renders selected date', () => {
    const { container, getByText } = render((
      <RecoilRoot>
        <App />
      </RecoilRoot>
    ));

    expect(container).toHaveTextContent('2021 년 12 월');

    fireEvent.click(getByText('11'));

    expect(container).toHaveTextContent('2021 년 12 월 11 일');
  });
});
