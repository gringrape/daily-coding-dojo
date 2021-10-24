import { render } from '@testing-library/react';

import TaskList from './TaskList';

describe('TaskList', () => {
  it('renders tasks', () => {
    const tasks = [
      { id: '1', title: '영화보기', isComplete: false },
      { id: '2', title: '밥먹기', isComplete: false },
    ];

    const { container } = render(<TaskList tasks={tasks} />);

    tasks.forEach(({ title }) => {
      expect(container).toHaveTextContent(title);
    });
  });
});
