'use client';
import { TaskStatus, TaskType } from '@/utils/types';
import { createContext, useContext, useState } from 'react';

interface ContextType {
  tasks: TaskType[];
  setTasksOnDragEvent: (taskId: string, newStatus: TaskStatus) => void;
  addTask: (newTask: TaskType) => void;
  deleteTask: (taskId: string) => void;
}

const ctx: ContextType = {
  tasks: [],
  setTasksOnDragEvent: () => {},
  addTask: () => {},
  deleteTask: () => {},
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

  const addTask = (newTask: TaskType) => {
    setTasks((prevState) => [...prevState, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== taskId));
  };

  const value = {
    tasks,
    setTasksOnDragEvent,
    addTask,
    deleteTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
