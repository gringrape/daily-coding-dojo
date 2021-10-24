import { Task } from '../models';

import tasksReducer, {
  addTask,
  setCompleteTask,
  deleteTask,
} from './tasksReducers';

describe('tasksReducer', () => {
  let tasks: Task[];

  beforeEach(() => {
    tasks = [
      { id: '1', title: '영화보기', isComplete: false },
    ];
  });

  test('addTask', () => {
    const title = '밥먹기';

    const updated = tasksReducer(tasks, addTask(title));

    const [added] = updated.slice(-1);

    expect(added.title).toBe(title);
    expect(updated.length).toBe(tasks.length + 1);
  });

  test('setCompleteTask', () => {
    const updated = tasksReducer(
      tasks,
      setCompleteTask({ id: '1', isComplete: true }),
    );

    const task = updated.find(({ id }) => id === '1');

    expect(task!.isComplete).toBe(true);
  });

  test('setCompleteTask', () => {
    const updated = tasksReducer(
      tasks,
      deleteTask('1'),
    );

    expect(updated.some(({ id }) => id === '1')).toBeFalsy();
  });
});
