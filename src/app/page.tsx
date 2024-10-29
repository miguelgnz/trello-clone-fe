'use client';

import { FormEvent, useEffect, useState } from 'react';
import { TaskType } from '@/utils/types';
import Task from '@/components/Task';
import { Button, Input } from '@nextui-org/react';

import { fetchTasks, postTask } from '@/services/tasks';

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  //Get tasks initial data
  useEffect(() => {
    const fetchData = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };

    fetchData();
  }, []);

  const handleOnAddTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      // id: crypto.randomUUID(),
      title: title,
      description: description,
      // status: "todo",
      // priority: "low",
    };

    //POST request to the server
    const response = await postTask(payload);

    //Do once you get the response successfully from server and use it to mutate state
    setTasks((prevState) => {
      return [...prevState, response.data];
    });
  };

  const handleDeleteTask = (task: TaskType) => {
    const updatedTasks = tasks.filter((t) => {
      return t.id !== task.id;
    });

    setTasks(updatedTasks);
  };

  // const filterDone = () => {
  //   const filteredTasks = tasks.filter((task) => {
  //     return task.status.toLowerCase() === "done";
  //   });

  //   console.log("Filtered tasks:", filteredTasks);
  // };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Tasks</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div
          id="todo-column"
          className="flex flex-col gap-3 p-4 bg-black rounded-xl"
        >
          <h2 className="text-white">Todo</h2>
          {tasks.map((task) => {
            return (
              <Task key={task.id} task={task} onDelete={handleDeleteTask} />
            );
          })}
          <form
            onSubmit={handleOnAddTask}
            style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
          >
            <label className="text-white">Title</label>
            <Input
              name="title"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label className="text-white">Description</label>
            <Input
              name="description"
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Button
              type="submit"
              className="border-2 border-red-400 rounded-md hover:border-blue-500"
            >
              Add New
            </Button>
          </form>
        </div>

        <div
          id="in-progress-column"
          className="flex flex-col gap-3 p-4 bg-black rounded-lg"
        >
          in-progress
        </div>
        <div
          id="done-column"
          className="flex flex-col gap-3 p-4 bg-black rounded-lg"
        >
          Done
        </div>

        
      </div>
    </div>
  );
}
