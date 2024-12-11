'use client';

import { useState } from 'react';
import Column from '@/components/Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import AddColumnForm from '@/components/AddColumnForm';
import AddBoardForm from '@/components/AddBoardForm';
import { TaskType } from '@/utils/types';
import { useBoardsContext } from '@/context/BoardsContext';
import { FaPlus } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import Spinner from '@/components/Spinner';

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const {
    boards,
    selectedBoard,
    boardsLoading,
    setTaskOnDragEvent,
    onChangeSelectedBoard,
  } = useBoardsContext();

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
        className={`absolute w-64 top-16 left-0 h-[calc(100%_-_64px)] z-10 bg-task  transition-transform duration-300 ${
          isSideMenuOpen ? 'translate-x-0' : '-translate-x-[calc(100%-12px)]'
        }`}
      >
        <Button
          isIconOnly
          variant="solid"
          radius="full"
          size="sm"
          className="absolute top-3 right-[-16px] p-2 bg-task font-bold border border-[#b6c2cf9c]"
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
        >
          {isSideMenuOpen ? (
            <IoChevronBack className="text-white" size={12} />
          ) : (
            <IoChevronForward className="text-white" size={12} />
          )}
        </Button>
        {/* Side menu content */}
        <div className="flex flex-col gap-2 pt-10">
          <div className="flex flex-row justify-between items-center pl-2 pr-2">
            <p className="text-taskText font-bold">Your Boards</p>
            <Popover
              backdrop="blur"
              isOpen={isPopoverOpen}
              onOpenChange={() => setIsPopoverOpen(false)}
            >
              <PopoverTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  className="text-white"
                  onClick={() => {
                    setIsPopoverOpen(!isPopoverOpen);
                  }}
                >
                  <FaPlus size={14} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-column p-6 w-72">
                <AddBoardForm
                  closePopover={() => {
                    setIsPopoverOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
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
        className={`flex flex-col pt-6 gap-6 min-w-full overflow-x-auto transition-all duration-300 ${
          isSideMenuOpen ? 'pl-[276px]' : 'pl-10'
        }`}
        id="main-grid"
      >
        {boardsLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="sm:text-3xl text-medium font-bold text-white ">
              {selectedBoard.title}
            </h1>

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
    </div>
  );
}
