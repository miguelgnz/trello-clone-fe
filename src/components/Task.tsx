"use client";
import { TaskType } from "@/utils/types";

interface Props {
  task: TaskType;
  onDelete: (task: TaskType) => void;
}

const Task = (props: Props) => {
  return (
    <div
      style={{
        border: "1px solid",
        borderRadius: "16px",
        width: "300px",
        padding: "12px",
      }}
    >
      <h3>{props.task.title}</h3>
      <p>{props.task.description}</p>
      <p>{props.task.status}</p>
      <button
        onClick={() => {
          props.onDelete(props.task);
        }}
      >
        Delete
      </button>
      <select>
        <option value="done">Done</option>
        <option value="in-progress">In Progress</option>
        <option value="todo">Todo</option>
      </select>
    </div>
  );
};

export default Task;
