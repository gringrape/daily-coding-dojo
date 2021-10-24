import {
  createContext, Dispatch, useReducer, useContext,
} from 'react';

import { Task } from '../models';
import Action from './Action';

import tasksReducer from './tasksReducers';

const initialTasks: Task[] = [];
const TasksContext = createContext<Task[]>(initialTasks);
const TasksDispatchContext = createContext<Dispatch<Action> | any>(null);

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

export function TasksProvide({ children }: { children: any}) {
  const [tasks, dispatch] = useReducer(
    tasksReducer, initialTasks,
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
