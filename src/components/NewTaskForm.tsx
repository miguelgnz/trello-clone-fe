'use client';

import { Input, Button } from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import { postTask } from '@/services/tasks';

export default function NewTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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

    console.log(response);

    //Do once you get the response successfully from server and use it to mutate state
    // setTasks((prevState) => {
    //   return [...prevState, response.data];
    // });
  };
  return (
    <>
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
    </>
  );
}
