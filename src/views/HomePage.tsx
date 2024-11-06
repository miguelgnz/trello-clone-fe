'use client';

import { useState } from 'react';
import { ColumnType, TaskType } from '@/utils/types';
import Column from '@/components/Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

const INITIAL_DATA: TaskType[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Design the homepage',
    description:
      'Create the initial design for the homepage including the layout and color scheme.',
    status: 'TODO',
    priority: 'High',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Set up project repository',
    description:
      'Initialize the project repository on GitHub and set up the basic project structure.',
    status: 'IN_PROGRESS',
    priority: 'Medium',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Implement authentication',
    description:
      'Develop the authentication module including login, registration, and password recovery.',
    status: 'TODO',
    priority: 'High',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Create task management API',
    description:
      'Build the backend API for managing tasks including CRUD operations.',
    status: 'DONE',
    priority: 'High',
  },
];

const COLUMNS: ColumnType[] = [
  { id: 'TODO', title: 'TODO' },
  { id: 'IN_PROGRESS', title: 'IN PROGRESS' },
  { id: 'DONE', title: 'DONE' },
];

export default function HomePage() {
  const [tasks, setTasks] = useState<TaskType[]>(INITIAL_DATA);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    // Important to use `as string` to avoid TypeScript errors since knd does not recognize the types
    const taskId = active.id as string;
    const newStatus = over.id as TaskType['status'];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 p-4">
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
    </div>
  );
}
