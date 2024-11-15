'use client';
import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useTasksContext } from '@/context/TasksContext';
import { TaskType } from '@/utils/types';

interface TaskTitleFormProps {
  cancelEditing: () => void;
  task: TaskType;
}

export default function TaskTitleForm({
  cancelEditing,
  task,
}: TaskTitleFormProps) {
  const { updateTitle } = useTasksContext();
  const [title, setTitle] = useState<string>(task.title || '');

  const handleOnSubmitTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      cancelEditing();
      return;
    }

    updateTitle(task.id, title);
    cancelEditing();
  };

  return (
    <form onSubmit={handleOnSubmitTitle} className="flex flex-col gap-2 w-full">
      <Input
        autoFocus
        required
        radius="sm"
        placeholder="Enter a title or paste a link"
        classNames={{
          inputWrapper: [
            'bg-[#22272b]',
            'group-data-[focus=true]:bg-[#22272b]',
            'group-data-[hover=true]:bg-[#22272b]',
            'group-data-[focus-visible=true]:ring-0',
          ],
          input: [
            'placeholder:text-default-700/50',
            'group-data-[has-value=true]:text-taskText',
          ],
        }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex flex-row gap-1">
        <Button
          type="submit"
          size="sm"
          className="text-taskText rounded-sm bg-secondaryBtn"
        >
          Save
        </Button>
        <Button
          size="sm"
          variant="light"
          className="text-taskText rounded-sm bg-[#e2e6ee0f]"
          onClick={() => {
            setTitle(task.title);
            cancelEditing();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
