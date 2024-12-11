'use client';

import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { MdOutlineClose } from 'react-icons/md';
import { useBoardsContext } from '@/context/BoardsContext';
import { constants } from '@/utils/constants';

interface BoardTitleFormProps {
  closeForm: () => void;
}

export default function BoardTitleForm({ closeForm }: BoardTitleFormProps) {
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const { editBoardTitle } = useBoardsContext();

  const { customInputClasses } = constants;

  const handleEditBoardTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newBoardTitle) return;

    // Use context here instead of local state
    editBoardTitle(newBoardTitle);
    closeForm();
  };

  return (
    <form
      onSubmit={handleEditBoardTitle}
      className="bg-column rounded-xl p-4 flex flex-col gap-1 h-fit w-96"
    >
      <Input
        maxLength={64}
        autoFocus
        classNames={customInputClasses}
        size="md"
        radius="sm"
        required
        placeholder="Enter board title"
        onChange={(e) => setNewBoardTitle(e.target.value)}
        value={newBoardTitle}
      />
      <div className="flex flex-row items-center gap-1">
        <Button
          size="sm"
          type="submit"
          className="bg-secondaryBtn text-white rounded-sm"
        >
          Add
        </Button>
        <Button
          isIconOnly
          variant="light"
          className="text-white"
          onClick={() => closeForm()}
        >
          <MdOutlineClose size={20} />
        </Button>
      </div>
    </form>
  );
}
