'use client';
import { TaskStatus, TaskType } from '@/utils/types';
import { createContext, useContext, useState } from 'react';

interface ContextType {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  setTasksOnDragEvent: (taskId: string, newStatus: TaskStatus) => void;
}

const ctx: ContextType = {
  tasks: [],
  setTasks: () => {},
  setTasksOnDragEvent: () => {},
};

export const TasksContext = createContext(ctx);

export const useTasksContext = () => useContext(TasksContext);

export const TasksContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Finish Trello Clone project',
      description:
        'Create the initial design for the homepage including the layout and color scheme.',
      status: 'TODO',
      priority: 'High',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      title: 'Set up project repository',
      description:
        'Initialize the project repository on GitHub and set up the basic project structure.',
      status: 'IN_PROGRESS',
      priority: 'Medium',
    },
  ]);

  const setTasksOnDragEvent = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };

  const value = {
    tasks,
    setTasks,
    setTasksOnDragEvent,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
