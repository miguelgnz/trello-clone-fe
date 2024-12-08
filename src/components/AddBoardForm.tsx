import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { MdOutlineClose } from 'react-icons/md';
import { constants } from '@/utils/constants';
import { useBoardsContext } from '@/context/BoardsContext';

interface AddBoardFormProps {
  closePopover: () => void;
}

const AddBoardForm = ({ closePopover }: AddBoardFormProps) => {
  const [userInput, setUserInput] = useState<string>('');

  const { addBoard } = useBoardsContext();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBoard(userInput);
    setUserInput('');
    closePopover();
  };

  const customInputClasses = constants.customInputClasses;
  return (
    <>
      <form className="flex flex-col gap-3 w-full" onSubmit={handleOnSubmit}>
        <Input
          autoFocus
          label="Board title"
          classNames={customInputClasses}
          size="md"
          radius="sm"
          required
          fullWidth
          placeholder="Enter a title for your board"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="flex flex-row items-center gap-1">
          <Button
            size="sm"
            type="submit"
            className="bg-secondaryBtn text-black rounded-md"
          >
            Add board
          </Button>
          <Button
            isIconOnly
            className="text-taskText"
            variant="light"
            onClick={() => {
              closePopover();
            }}
          >
            <MdOutlineClose size={20} />
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddBoardForm;
