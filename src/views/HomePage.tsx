'use client';

import { useState } from 'react';
import Column from '@/components/Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useTasksContext } from '@/context/TasksContext';
import { Button } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa';
import { useColumnsContext } from '@/context/ColumnsContext';
import AddColumnForm from '@/components/AddColumnForm';
import { TaskType } from '@/utils/types';

export default function HomePage() {
  const { columns } = useColumnsContext();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const { tasks, setTasksOnDragEvent } = useTasksContext();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    // Important to use `as string` to avoid TypeScript errors since knd does not recognize the types
    const taskId = active.id as string;
    const newStatus = over.id as TaskType['status'];

    setTasksOnDragEvent(taskId, newStatus);
  }

  return (
    <div
      className="gap-4 p-4 min-w-full overflow-x-auto grid grid-flow-col auto-cols-[280px]"
      id="main-grid"
    >
      <DndContext onDragEnd={handleDragEnd}>
        {columns.map((column) => {
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          );
        })}
      </DndContext>
      {isFormOpen ? (
        <>
          <AddColumnForm setIsFormOpen={setIsFormOpen} />
        </>
      ) : (
        <Button
          className="bg-[#ffffff3d] text-white font-medium"
          startContent={<FaPlus />}
          variant="light"
          onClick={() => setIsFormOpen(true)}
        >
          Add another column
        </Button>
      )}
    </div>
  );
}
