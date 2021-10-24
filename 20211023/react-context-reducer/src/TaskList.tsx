import { Task } from './models';

import TaskItem from './TaskItem';

export default function Tasks({ tasks }: {
  tasks: Task[];
}) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
