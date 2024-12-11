'use client';

import { useState } from 'react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import AddBoardForm from '@/components/AddBoardForm';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FaPlus } from 'react-icons/fa';
import { useBoardsContext } from '@/context/BoardsContext';

interface SideMenuProps {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideMenu({
  isSideMenuOpen,
  setIsSideMenuOpen,
}: SideMenuProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const { boards, selectedBoard, onChangeSelectedBoard, deleteBoard } =
    useBoardsContext();

  return (
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
              <div
                key={board.id}
                className={`flex flex-row items-center justify-between pl-2 pr-2 cursor-pointer text-taskText text-sm w-full hover:bg-[#ffffff3d] ${
                  selectedBoard.id === board.id ? 'bg-[#ffffff3d]' : ''
                }`}
                onClick={() => {
                  onChangeSelectedBoard(board.id);
                  setIsSideMenuOpen(false);
                }}
              >
                <span>{board.title}</span>

                <Popover backdrop="opaque">
                  <PopoverTrigger>
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      className="text-white"
                    >
                      <HiOutlineDotsHorizontal size={14} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-column p-4">
                    <Button
                      color="danger"
                      variant="light"
                      onClick={() => {
                        deleteBoard(board.id);
                      }}
                    >
                      Delete Board
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
