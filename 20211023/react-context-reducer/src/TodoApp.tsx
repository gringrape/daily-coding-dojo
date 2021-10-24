import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { useTasks } from './context/TaskContext';

export default function App() {
  const tasks = useTasks();

  return (
    <>
      <TaskForm />
      <TaskList tasks={tasks} />
    </>
  );
}
