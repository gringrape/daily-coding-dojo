import { fireEvent, render } from '@testing-library/react';

import { useTasksDispatch } from './context/TaskContext';

import TaskItem from './TaskItem';

jest.mock('./context/TaskContext.tsx');
const mockedUseTasksDispatch = useTasksDispatch as jest.MockedFunction<typeof useTasksDispatch>;

describe('TaskItem', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    mockedUseTasksDispatch.mockReturnValue(dispatch);
  });

  const task = { id: '1', title: '밥 먹기', isComplete: false };

  it('renders a task item', () => {
    const { container } = render(<TaskItem task={task} />);

    expect(container).toHaveTextContent('밥 먹기');
  });

  it('listens check event', () => {
    const { getByLabelText } = render(<TaskItem task={task} />);

    fireEvent.click(getByLabelText(task.title));

    expect(dispatch).toBeCalled();
  });

  it('listens delete event', () => {
    const { getByText } = render(<TaskItem task={task} />);

    fireEvent.click(getByText('삭제'));

    const [action] = dispatch.mock.calls[0];
    const { payload: deletedId } = action;

    expect(dispatch).toBeCalled();
    expect(deletedId).toBe('1');
  });
});
