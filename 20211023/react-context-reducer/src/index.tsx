import * as ReactDOM from 'react-dom';

import TodoApp from './TodoApp';
import { TasksProvide } from './context/TaskContext';

const container = document.getElementById('app');
ReactDOM.render(
  <TasksProvide>
    <TodoApp />
  </TasksProvide>,
  container,
);
