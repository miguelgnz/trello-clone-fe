'use client';
import React, { useState } from 'react';

import { ColumnType, TaskType } from '@/utils/types';
import Task from '@/components/Task';
import { useDroppable } from '@dnd-kit/core';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import AddTaskForm from './AddTaskForm';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FaPlus } from 'react-icons/fa';
import { useColumnsContext } from '@/context/ColumnsContext';

interface ColumnProps {
  tasks: TaskType[];
  column: ColumnType;
}

export default function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  const [isInputVisible, setIsInputVisible] = useState(false);

  const { deleteColumn } = useColumnsContext();

  return (
    <div
      className="flex flex-col gap-3 p-4 bg-column rounded-xl h-min" //max-h-[calc(100vh-6rem)]
      ref={setNodeRef}
    >
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-white font-sans text-sm font-semibold">
          {column.title}
        </h2>
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button isIconOnly variant="light" className="text-white">
              <HiOutlineDotsHorizontal size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-modal">
            <div className="px-1 py-2">
              <Button
                color="danger"
                variant="light"
                onClick={() => deleteColumn(column.id)}
              >
                Delete Column
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {/* List of tasks */}
      <div className="flex flex-col gap-2">
        {tasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>
      {isInputVisible && (
        <AddTaskForm setIsInputVisible={setIsInputVisible} column={column} />
      )}
      {!isInputVisible && (
        <Button
          className="text-taskText"
          variant="light"
          startContent={<FaPlus />}
          onClick={() => {
            setIsInputVisible(true);
          }}
        >
          Add a card
        </Button>
      )}
    </div>
  );
}
