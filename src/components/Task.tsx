'use client';
import { TaskType } from '@/utils/types';
import { useDraggable } from '@dnd-kit/core';
import { Button } from '@nextui-org/react';
import { FaRegTrashAlt } from 'react-icons/fa';

interface Props {
  task: TaskType;
  onDelete?: (task: TaskType) => void;
}

const Task = (props: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.task.id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-task p-4 rounded-xl z-10"
      style={style}
    >
      {/* <h3 className="text-taskText text-lg">{props.task.title}</h3> */}
      <p className="text-taskText text-sm font-normal">
        {props.task.description}
      </p>
      {/* <p className="text-taskText">{props.task.status}</p> */}
      <Button
        className="text-taskText"
        isIconOnly
        variant="light"
        onClick={() => {
          // props.onDelete(props.task);
        }}
      >
        <FaRegTrashAlt />
      </Button>
    </div>
  );
};

export default Task;
