import { ColumnType, TaskType } from '@/utils/types';
import AddCardButton from './AddCardButton';
import Task from '@/components/Task';
import { useDroppable } from '@dnd-kit/core';

interface ColumnProps {
  tasks: TaskType[];
  column: ColumnType;
}

export default function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div className="flex flex-col gap-3 p-4 bg-column rounded-xl h-min min-h-36" ref={setNodeRef}>
      <h2 className="text-white font-sans text-sm font-semibold">
        {column.title}
      </h2>
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
      <AddCardButton />
    </div>
  );
}
