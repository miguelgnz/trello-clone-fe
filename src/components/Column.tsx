'use client';
import React, { useState } from 'react';

import { ColumnType, TaskType } from '@/utils/types';
import Task from '@/components/Task';
import { useDroppable } from '@dnd-kit/core';
import { Button } from '@nextui-org/react';
import AddTaskForm from './AddTaskForm';

import { FaPlus } from 'react-icons/fa';

interface ColumnProps {
  tasks: TaskType[];
  column: ColumnType;
}

export default function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  const [isInputVisible, setIsInputVisible] = useState(false);

  return (
    <div
      className="flex flex-col gap-3 p-4 bg-column rounded-xl h-min min-h-36"
      ref={setNodeRef}
    >
      <h2 className="text-white font-sans text-sm font-semibold">
        {column.title}
      </h2>
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
      {isInputVisible && <AddTaskForm setIsInputVisible={setIsInputVisible} column={column}/>}
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
