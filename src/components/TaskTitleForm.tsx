'use client';

import { useState } from 'react';
import { Button, Textarea } from '@nextui-org/react';
import { useTasksContext } from '@/context/TasksContext';
import { TaskType } from '@/utils/types';
import { constants } from '@/utils/constants';

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

  const { customModalInputClasses } = constants;

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
    <form className="flex flex-col gap-2 w-full" onSubmit={handleOnSubmitTitle}>
      <Textarea
        autoFocus
        classNames={customModalInputClasses}
        required
        radius="sm"
        placeholder="Enter a title or paste a link"
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
          className="text-taskText rounded-sm"
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
