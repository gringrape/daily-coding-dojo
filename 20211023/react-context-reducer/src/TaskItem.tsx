import { deleteTask, setCompleteTask } from './context/tasksReducers';

import { useTasksDispatch } from './context/TaskContext';

import { Task } from './models';

export default function TaskItem({ task }: { task: Task}) {
  const dispatch = useTasksDispatch();

  const { id, title, isComplete } = task;

  const handleClickCheck = (e: any) => {
    const { checked } = e.target;

    dispatch(setCompleteTask({ id, isComplete: checked }));
  };

  const handleClickDelete = () => {
    // TODO: 액션 호출
    dispatch(deleteTask(id));
  };

  return (
    <li style={{ listStyle: 'none' }}>
      <input
        type="checkbox"
        id={`input-task-status-${id}`}
        onClick={handleClickCheck}
      />
      <label
        htmlFor="input-task-status-1"
        style={{ textDecoration: isComplete ? 'line-through' : 'none' }}
      >
        {title}
      </label>
      <button type="button" onClick={handleClickDelete}>
        삭제
      </button>
    </li>
  );
}
