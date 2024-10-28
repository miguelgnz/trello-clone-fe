"use client";

import { FormEvent, useEffect, useState } from "react";
import { TaskType } from "@/utils/types";
import Task from "@/components/Task";

import { fetchTasks, postTask } from "@/services/tasks";

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

  const filterDone = () => {
    const filteredTasks = tasks.filter((task) => {
      return task.status.toLowerCase() === "done";
    });

    console.log("Filtered tasks:", filteredTasks);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={filterDone}>Show Done</button>
      <button>Show All</button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {tasks.map((task) => {
            return (
              <Task key={task.id} task={task} onDelete={handleDeleteTask} />
            );
          })}
          <form
            onSubmit={handleOnAddTask}
            style={{ display: "flex", flexDirection: "column", width: "300px" }}
          >
            <label>Title</label>
            <input
              name="title"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label>Description</label>
            <input
              name="description"
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <button type="submit">Add New</button>
          </form>
        </div>
      </div>
    </div>
  );
}
