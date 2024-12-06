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
        className={`fixed w-64 top-16 left-0 h-full z-10 bg-task  transition-transform duration-300 ${
          isSideMenuOpen ? 'translate-x-0' : '-translate-x-[calc(100%-12px)]'
        }`}
      >
        <Button
          isIconOnly
          variant="solid"
          radius="full"
          size="sm"
          className="absolute top-6 right-[-16px] p-2 bg-task font-bold border border-[#b6c2cf9c]"
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
        >
          {isSideMenuOpen ? (
            <IoChevronBack className="text-white" size={12} />
          ) : (
            <IoChevronForward className="text-white" size={12} />
          )}
        </Button>
        {/* Side menu content */}
        <div className="flex flex-col gap-4">
          <p className="text-taskText font-bold p-4">Your Boards</p>
          <div className="flex flex-col">
            {boards.map((board) => {
              return (
                <Button
                  key={board.id}
                  className={`text-taskText w-full rounded-none justify-start text-sm ${
                    selectedBoard.id === board.id ? 'bg-[#ffffff3d]' : ''
                  }`}
                  variant="light"
                  size="sm"
                  onClick={() => {
                    onChangeSelectedBoard(board.id);
                    setIsSideMenuOpen(false);
                  }}
                >
                  {board.title}
                </Button>
              );
            })}
          </div>
        </div>
      </div>


      <div
        className={`gap-4 pt-4 pr-4 pb-4 min-w-full overflow-x-auto grid grid-flow-col auto-cols-[280px] z-0 transition-all duration-300 ${
          isSideMenuOpen ? 'pl-[276px]' : 'pl-10'
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
