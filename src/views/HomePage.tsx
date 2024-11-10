'use client';

import { ColumnType, TaskType } from '@/utils/types';
import Column from '@/components/Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useTasksContext } from '@/context/TasksContext';

const COLUMNS: ColumnType[] = [
  { id: 'TODO', title: 'TODO' },
  { id: 'IN_PROGRESS', title: 'IN PROGRESS' },
  { id: 'DONE', title: 'DONE' },
];

export default function HomePage() {
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
      className="grid grid-cols-[repeat(3,_minmax(280px,_1fr))] gap-4 p-4 min-w-full overflow-x-auto"
      id="main-grid"
    >
      <DndContext onDragEnd={handleDragEnd}>
        {COLUMNS.map((column) => {
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          );
        })}
      </DndContext>
    </div>
  );
}
