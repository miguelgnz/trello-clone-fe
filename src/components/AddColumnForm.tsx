'use client';

import { FormEvent, useState } from 'react';
import { constants } from '@/utils/constants';
import { Button, Input } from '@nextui-org/react';
import { MdOutlineClose } from 'react-icons/md';
import { ColumnType } from '@/utils/types';
import { useBoardsContext } from '@/context/BoardsContext';

interface AddColumnFormProps {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddColumnForm = ({ setIsFormOpen }: AddColumnFormProps) => {
  const { customInputClasses } = constants;

  const [newColumnTitle, setNewColumnTitle] = useState('');

  const { addColumn, selectedBoard } = useBoardsContext();

  const handleAddColumn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newColumnTitle) return;

    const columnExists = selectedBoard.columns.some(
      (column) => column.id === newColumnTitle.toUpperCase()
    );

    if (columnExists) {
      alert('Column already exists');
      setNewColumnTitle('');
      return;
    }

    const newColumn: ColumnType = {
      id: newColumnTitle.toUpperCase(),
      title: newColumnTitle.toUpperCase(),
    };

    //Use context here instead of local state
    addColumn(newColumn);

    setNewColumnTitle('');
    setIsFormOpen(false);
  };

  return (
    <form
      onSubmit={handleAddColumn}
      className="bg-column rounded-xl p-4 flex flex-col gap-1 h-fit"
    >
      <Input
        maxLength={24}
        autoFocus
        classNames={customInputClasses}
        size="md"
        radius="sm"
        required
        placeholder="Enter column title"
        onChange={(e) => setNewColumnTitle(e.target.value)}
        value={newColumnTitle}
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
          onClick={() => setIsFormOpen(false)}
        >
          <MdOutlineClose size={20} />
        </Button>
      </div>
    </form>
  );
};

export default AddColumnForm;
