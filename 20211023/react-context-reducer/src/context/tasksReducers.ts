import { Task } from '../models';
import Action from './Action';

export default function reducer(tasks: Task[], action: Action): Task[] {
  const { type, payload } = action;

  const updateFunctions: {
    [key: string]: () => Task[]
  } = {
    addTask() {
      return [
        ...tasks,
        { id: new Date().toLocaleTimeString(), title: payload, isComplete: false },
      ];
    },
    setCompleteTask() {
      const { id, isComplete } = payload;

      return tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }
        return { ...task, isComplete };
      });
    },
    deleteTask() {
      return tasks.filter(({ id }) => id !== payload);
    },
  };

  return updateFunctions[type]();
}

export const addTask = (title: string): Action => ({
  type: 'addTask',
  payload: title,
});

export const setCompleteTask = ({ id, isComplete }: {
  id: string;
  isComplete: boolean;
}): Action => ({
  type: 'setCompleteTask',
  payload: { id, isComplete },
});

export const deleteTask = (id: string): Action => ({
  type: 'deleteTask',
  payload: id,
});
