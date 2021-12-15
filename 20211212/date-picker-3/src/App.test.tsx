import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import App from './App';

describe('App', () => {
  it('renders without crash', () => {
    render((
      <RecoilRoot>
        <App />
      </RecoilRoot>
    ));
  });
});
