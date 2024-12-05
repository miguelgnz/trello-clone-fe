'use client';

import { useState } from 'react';
import Column from '@/components/Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Button } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa';
import AddColumnForm from '@/components/AddColumnForm';
import { TaskType } from '@/utils/types';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useBoardsContext } from '@/context/BoardsContext';

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const { boards, selectedBoard, setTaskOnDragEvent, onChangeSelectedBoard } =
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
    <div className="flex flex-row">
      <div
        className={`fixed top-16 left-0 h-full bg-task p-4 transition-transform duration-300 ${
          isSideMenuOpen ? 'translate-x-0' : '-translate-x-[calc(100%-20px)]'
        }`}
        style={{ width: '250px' }}
      >
        <Button
          isIconOnly
          variant="solid"
          radius="full"
          size="sm"
          className="absolute top-16 right-[-16px] p-2 bg-task border-[0.5px] font-bold"
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
        >
          {isSideMenuOpen ? (
            <IoChevronBack className="text-white" />
          ) : (
            <IoChevronForward className="text-white" />
          )}
        </Button>
        {/* Side menu content */}
        <div>
          <p>Your Boards</p>
          <ul>List of boards</ul>
          {boards.map((board) => {
            return (
              <li key={board.id} className="flex flex-row items-center gap-2">
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => {
                    onChangeSelectedBoard(board.id);
                  }}
                >
                  {board.title}
                </Button>
              </li>
            );
          })}
        </div>
      </div>
      {/* Main content */}
      <div
        className={`gap-4 p-4 min-w-full overflow-x-auto grid grid-flow-col auto-cols-[280px] transition-all duration-300 ${
          isSideMenuOpen ? 'ml-[290px]' : 'ml-[32px]'
        }`}
        id="main-grid"
      >
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
    </div>
  );
}
