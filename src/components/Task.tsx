'use client';
import { TaskType } from '@/utils/types';
import { Button } from '@nextui-org/react';
import { FaRegTrashAlt } from 'react-icons/fa';

interface Props {
  task: TaskType;
  onDelete: (task: TaskType) => void;
}

const Task = (props: Props) => {
  return (
    <div className="bg-zinc-800 p-4 rounded-xl">
      <h3 className="text-white text-lg">{props.task.title}</h3>
      <p className="text-white">{props.task.description}</p>
      <p className="text-white">{props.task.status}</p>
      <Button
        isIconOnly
        onClick={() => {
          props.onDelete(props.task);
        }}
      >
        <FaRegTrashAlt />
      </Button>
    </div>
  );
};

export default Task;
