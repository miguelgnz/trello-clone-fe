'use client';
import { TaskType } from '@/utils/types';
import { useDraggable } from '@dnd-kit/core';
import { GrTextAlignFull } from 'react-icons/gr';
import { useTasksContext } from '@/context/TasksContext';
import { Button, Tooltip, useDisclosure } from '@nextui-org/react';

import TaskModal from './TaskModal';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useState } from 'react';

interface Props {
  task: TaskType;
}

const Task = (props: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.task.id,
  });

  const { deleteTask } = useTasksContext();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        className={`bg-task p-4 rounded-xl hover:border-1 border-secondaryBtn ${isDragging ? 'z-[1000]' : ''}`}
        style={style}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2 w-[90%]">
            <p className="text-taskText text-sm font-normal">
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
          <div className="relative top-[-12px] left-[4px] w-[10%]">
            {isHovered && (
              <Tooltip content="Delete task" size="sm" radius="sm">
                <Button
                  className="text-danger"
                  color="danger"
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => {
                    deleteTask(props.task.id);
                  }}
                >
                  <FaRegTrashAlt />
                </Button>
              </Tooltip>
            )}
          </div>
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
