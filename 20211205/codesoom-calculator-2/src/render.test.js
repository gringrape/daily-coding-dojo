import { fireEvent, queryByText, getByText } from '@testing-library/dom';

import '@testing-library/jest-dom';

import render from './render';

describe('app', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const app = document.createElement('div');
    app.setAttribute('id', 'app');

    document.body.appendChild(app);
  });

  function renderApp() {
    render();
    return document.getElementById('app');
  }

  it('숫자를 눌렀을 때 누른 숫자가 표시됩니다.', () => {
    const app = renderApp();

    fireEvent.click(getByText(app, '4'));
    fireEvent.click(getByText(app, '3'));

    expect(queryByText(app, '43')).toBeInTheDocument();
  });

  it('연산자를 입력한 후 다시 숫자를 입력하면 새로 입력한 숫자가 표시됩니다.', () => {
    const app = renderApp();

    ['4', '3', '+', '2', '1'].forEach((it) => fireEvent.click(getByText(app, it)));

    expect(queryByText(app, '43')).not.toBeInTheDocument();
    expect(queryByText(app, '21')).toBeInTheDocument();
  });

  it('"="를 클릭하면 결과가 출력됩니다.', () => {
    const app = renderApp();

    ['5', '+', '9', '='].forEach((it) => fireEvent.click(getByText(app, it)));

    expect(queryByText(app, '14')).toBeInTheDocument();
  });
});
