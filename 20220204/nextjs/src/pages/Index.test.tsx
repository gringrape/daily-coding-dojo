import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import Index from './Index.page';

describe('Index', () => {
  it('renders without crash', () => {
    const { container } = render(<Index />);

    expect(container).toHaveTextContent('hello world!');
  });
});
