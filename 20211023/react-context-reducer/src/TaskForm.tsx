import { ChangeEvent, useState } from 'react';

import { useTasksDispatch } from './context/TaskContext';
import { addTask } from './context/tasksReducers';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const dispatch = useTasksDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTitle(value);
  };

  const handleClick = () => {
    if (title.length === 0) {
      return;
    }

    dispatch(addTask(title));

    setTitle('');
  };

  return (
    <form>
      <label htmlFor="input-task">
        할 일
      </label>
      <input type="text" id="input-task" value={title} onChange={handleChange} />
      <button type="button" onClick={handleClick}>
        등록
      </button>
    </form>
  );
}
