'use client';
import { TaskType } from '@/utils/types';
import { useDraggable } from '@dnd-kit/core';
import { FaRegTrashAlt } from 'react-icons/fa';
import { GrTextAlignFull } from 'react-icons/gr';
import { MdOutlineEdit } from 'react-icons/md';
import { useTasksContext } from '@/context/TasksContext';
import { Button, Tooltip, useDisclosure } from '@nextui-org/react';

import TaskModal from './TaskModal';
import { useState } from 'react';

interface Props {
  task: TaskType;
}

const Task = (props: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseUp={onOpen}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="bg-task p-4 rounded-xl z-[2] hover:border-1 border-secondaryBtn"
        style={style}
      >
        <div className="flex flex-col gap-2">
          <p className="text-taskText text-sm font-normal m-1">
            {props.task.title.length > 280
              ? `${props.task.title.slice(0, 280)}...`
              : props.task.title}
          </p>
          {props.task.description && (
            <Tooltip
              content="This task has a description"
              size="sm"
              radius="sm"
            >
              <div className="w-fit">
                <GrTextAlignFull size={13} className="text-taskText" />
              </div>
            </Tooltip>
          )}
        </div>
        <div className="flex flex-row justify-end">
          {isHovered && (
            <Button
              className="text-taskText"
              isIconOnly
              variant="light"
              onClick={() => {}}
            >
              <MdOutlineEdit />
            </Button>
          )}
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
