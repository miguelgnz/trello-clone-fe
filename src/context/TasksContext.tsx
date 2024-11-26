'use client';
import { TaskStatus, TaskType } from '@/utils/types';
import { createContext, useContext, useState, useEffect } from 'react';

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
  const [tasks, setTasks] = useState<TaskType[]>([]);

  //Set tasks from local storage
  useEffect(() => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
  }, []);

  //Save tasks to local storage
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [tasks]);

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
