'use client';
import { TaskType } from '@/utils/types';
import { useDraggable } from '@dnd-kit/core';
import { Button } from '@nextui-org/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useTasksContext } from '@/context/TasksContext';

interface Props {
  task: TaskType;
  onDelete?: (task: TaskType) => void;
}

const Task = (props: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.task.id,
  });

  const { deleteTask } = useTasksContext();

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-task p-4 rounded-xl z-[2] hover:border-2 border-secondaryBtn"
      style={style}
    >
      <p className="text-taskText text-sm font-normal">
        {props.task.title.length > 280
          ? `${props.task.title.slice(0, 280)}...`
          : props.task.title}
      </p>
      <div className="flex flex-row justify-end">
        <Button
          className="text-taskText"
          isIconOnly
          variant="light"
          onClick={() => {
            deleteTask(props.task.id);
          }}
        >
          <FaRegTrashAlt />
        </Button>
      </div>
    </div>
  );
};

export default Task;
