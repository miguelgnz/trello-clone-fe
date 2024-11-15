'use client';
import { TaskStatus, TaskType } from '@/utils/types';
import { createContext, useContext, useState } from 'react';

interface ContextType {
  tasks: TaskType[];
  setTasksOnDragEvent: (taskId: string, newStatus: TaskStatus) => void;
  addTask: (newTask: TaskType) => void;
  deleteTask: (taskId: string) => void;
  updateDescription: (taskId: string, newDescription: string) => void;
  updateTitle: (taskId: string, newTitle: string) => void;
}

const ctx: ContextType = {
  tasks: [],
  setTasksOnDragEvent: () => {},
  addTask: () => {},
  deleteTask: () => {},
  updateDescription: () => {},
  updateTitle: () => {},
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
      title: 'This is the first task in your board!',
      description: '',
      status: 'TODO',
      priority: 'High',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440030',
      title:
        'Tasks can be dragged and dropped to change their status. Try it out!',
      description:
        'Chislic tenderloin sirloin, landjaeger bacon jerky buffalo. Capicola ground round ham beef ribs meatball, hamburger kevin burgdoggen salami jowl pork loin pork belly venison. Shank pork loin frankfurter tenderloin tri-tip ground round. Prosciutto meatloaf t-bone drumstick shoulder turducken chuck picanha kielbasa swine. Cupim leberkas ham hock shoulder jowl biltong pork',
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

  const updateDescription = (taskId: string, newDescription: string) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === taskId
          ? {
              ...task,
              description: newDescription,
            }
          : task
      )
    );
  };

  const updateTitle = (taskId: string, newTitle: string) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: newTitle,
            }
          : task
      )
    );
  };

  const value = {
    tasks,
    setTasksOnDragEvent,
    addTask,
    deleteTask,
    updateDescription,
    updateTitle,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
