'use client';

import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { MdOutlineClose } from 'react-icons/md';
import { ColumnType, TaskType } from '@/utils/types';
import { useTasksContext } from '@/context/TasksContext';
import { constants } from '@/utils/constants';
import { v4 as uuidv4 } from 'uuid';

interface AddTaskFormProps {
  setIsInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  column: ColumnType;
}

export default function AddTaskForm({
  setIsInputVisible,
  column,
}: AddTaskFormProps) {
  const [userInput, setUserInput] = useState<string>('');

  const { customInputClasses } = constants;

  const { addTask } = useTasksContext();

  const onClickAddCard = () => {
    const newTask: TaskType = {
      id: uuidv4(),
      title: userInput,
      description: '',
      status: column.id,
      priority: 'Low',
    };

    addTask(newTask);
    setIsInputVisible(false);
  };

  return (
    <>
      <form
        className="flex flex-col gap-3 "
        onSubmit={(e) => {
          e.preventDefault();
          onClickAddCard();
        }}
      >
        <Input
          autoFocus
          classNames={customInputClasses}
          size="md"
          radius="sm"
          required
          fullWidth
          placeholder="Enter a title or paste a link"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="flex flex-row items-center gap-1">
          <Button
            type="submit"
            className="bg-secondaryBtn text-black rounded-md"
          >
            Add card
          </Button>
          <Button
            isIconOnly
            className="text-taskText"
            variant="light"
            onClick={() => {
              setIsInputVisible(false);
            }}
          >
            <MdOutlineClose size={20} />
          </Button>
        </div>
      </form>
    </>
  );
}
