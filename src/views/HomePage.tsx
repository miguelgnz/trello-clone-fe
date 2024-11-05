'use client';

import { useEffect, useState } from 'react';
import { TaskType } from '@/utils/types';
import Task from '@/components/Task';

import { fetchTasks } from '@/services/tasks';
import Column from '@/components/Column';

export default function HomePage() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };

    fetchData();
  }, []);

  const handleDeleteTask = (task: TaskType) => {
    const updatedTasks = tasks.filter((t) => {
      return t.id !== task.id;
    });

    setTasks(updatedTasks);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <Column title="TODO">
          {tasks.map((task) => {
            return (
              <Task key={task.id} task={task} onDelete={handleDeleteTask} />
            );
          })}
        </Column>
        <Column title="IN PROGRESS">Test</Column>
        <Column title="DONE">/</Column>
      </div>
    </div>
  );
}
