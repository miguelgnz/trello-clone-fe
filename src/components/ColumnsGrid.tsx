import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Button } from '@nextui-org/react';
import { useBoardsContext } from '@/context/BoardsContext';
import { FaPlus } from 'react-icons/fa';
import { TaskType } from '@/utils/types';

import Column from '@/components/Column';
import AddColumnForm from '@/components/AddColumnForm';
import Spinner from '@/components/Spinner';
import BoardTitleForm from './BoardTitleForm';

interface ColumnsGridProps {
  isSideMenuOpen: boolean;
}

export default function ColumnsGrid({ isSideMenuOpen }: ColumnsGridProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBoardTitleFormOpen, setIsBoardTitleFormOpen] = useState(false);

  const { selectedBoard, boardsLoading, setTaskOnDragEvent } =
    useBoardsContext();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    // Important to use `as string` to avoid TypeScript errors since knd does not recognize the types
    const taskId = active.id as string;
    const newStatus = over.id as TaskType['status'];

    setTaskOnDragEvent(taskId, newStatus);
  }

  return (
    <div
      data-testid="columns-grid"
      className={`flex flex-col pt-6 gap-6 min-w-full overflow-x-auto transition-all duration-300 ${
        isSideMenuOpen ? 'pl-[276px]' : 'pl-10'
      }`}
      id="main-grid"
    >
      {boardsLoading ? (
        <Spinner />
      ) : (
        <>
          {isBoardTitleFormOpen ? (
            <BoardTitleForm closeForm={() => setIsBoardTitleFormOpen(false)} />
          ) : (
            <h1
              className="sm:text-3xl text-medium font-bold text-white "
              onClick={() => {
                setIsBoardTitleFormOpen(true);
              }}
            >
              {selectedBoard.title}
            </h1>
          )}

          <div className="gap-4 pt-4 pr-4 pb-4 min-w-full overflow-x-auto grid grid-flow-col auto-cols-[280px] z-0">
            <DndContext onDragEnd={handleDragEnd}>
              {selectedBoard.columns.map((column) => {
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={selectedBoard.tasks.filter(
                      (task) => task.status === column.id
                    )}
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
        </>
      )}
    </div>
  );
}
