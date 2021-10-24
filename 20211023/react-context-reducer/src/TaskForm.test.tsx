import { render, fireEvent } from '@testing-library/react';

import TaskForm from './TaskForm';

import { useTasksDispatch } from './context/TaskContext';

jest.mock('./context/TaskContext.tsx');
const mockedUseTasksDispatch = useTasksDispatch as jest.MockedFunction<typeof useTasksDispatch>;

describe('TodoForm', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    mockedUseTasksDispatch.mockReturnValue(dispatch);
  });

  function registerTask(title: string) {
    const { getByLabelText, getByText } = render(<TaskForm />);

    const input = getByLabelText('할 일');

    fireEvent.change(input, { target: { value: title } });
    fireEvent.click(getByText('등록'));

    return {
      input,
    };
  }

  context('with task title', () => {
    const title = '밥 먹기';

    it('adds task', () => {
      registerTask(title);

      const [action] = dispatch.mock.calls[0];
      const { payload } = action;

      expect(dispatch).toBeCalled();
      expect(payload).toBe(title);
    });

    it('does not render title after register', () => {
      const { input } = registerTask(title);

      expect(input).toHaveDisplayValue('');
    });
  });

  context('without task title', () => {
    const title = '';

    it('does not add task on empty input', () => {
      registerTask(title);

      expect(dispatch).not.toBeCalled();
    });
  });
});
