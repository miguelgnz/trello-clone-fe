'use client';
import { TaskType } from '@/utils/types';
import { useDraggable } from '@dnd-kit/core';
import { FaRegTrashAlt } from 'react-icons/fa';
import { GrTextAlignFull } from 'react-icons/gr';
import { useTasksContext } from '@/context/TasksContext';

import { Button, useDisclosure } from '@nextui-org/react';

import TaskModal from './TaskModal';

interface Props {
  task: TaskType;
}

const Task = (props: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.task.id,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { deleteTask } = useTasksContext();

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <>
      <div
        onMouseUp={onOpen}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="bg-task p-4 rounded-xl z-[2] hover:border-2 border-secondaryBtn"
        style={style}
      >
        <div className="flex flex-col gap-2">
          <p className="text-taskText text-sm font-normal">
            {props.task.title.length > 280
              ? `${props.task.title.slice(0, 280)}...`
              : props.task.title}
          </p>
          {props.task.description && (
            <GrTextAlignFull size={13} className="text-taskText" />
          )}
        </div>
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
      <TaskModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        task={props.task}
      />
    </>
  );
};

export default Task;
