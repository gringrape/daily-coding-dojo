import { render } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useRef } from 'react';

import useClickOutside from './useClickOutside';

describe('useClickOutside', () => {
  function Component({ onClickOutside }: {
    onClickOutside: any
  }) {
    const insideElementRef = useRef(null);

    useClickOutside(insideElementRef, onClickOutside);

    return (
      <div id="outside">
        <p>바깥</p>
        <div id="inside" ref={insideElementRef}>
          <p>안</p>
        </div>
      </div>
    );
  }

  it('listens click outside event', () => {
    const handleClickOutside = jest.fn();

    const { getByText } = render(<Component onClickOutside={handleClickOutside} />);

    userEvent.click(getByText('안'));

    expect(handleClickOutside).not.toBeCalled();

    userEvent.click(getByText('바깥'));

    expect(handleClickOutside).toBeCalled();
  });
});
