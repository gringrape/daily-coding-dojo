import { render, fireEvent } from '@testing-library/react';
import { TasksProvide } from './context/TaskContext';

import TodoApp from './TodoApp';

describe('TodoApp', () => {
  const renderApp = () => (
    render(
      <TasksProvide>
        <TodoApp />
      </TasksProvide>,
    )
  );

  it('renders without crash', () => {
    renderApp();
  });

  it('listens change event', () => {
    const {
      container, getByLabelText, getByText,
    } = renderApp();

    fireEvent.change(getByLabelText('할 일'), {
      target: { value: '밥 먹기' },
    });

    fireEvent.click(getByText('등록'));

    expect(container).toHaveTextContent('밥 먹기');
  });
});
