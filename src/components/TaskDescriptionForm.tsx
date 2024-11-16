'use client';

import { useState } from 'react';
import { TaskType } from '@/utils/types';
import { Button, Textarea } from '@nextui-org/react';
import { constants } from '@/utils/constants';
import { useTasksContext } from '@/context/TasksContext';

interface TaskDescriptionFormProps {
  task: TaskType;
  cancelEditing: () => void;
}

const TaskDescriptionForm = ({
  task,
  cancelEditing,
}: TaskDescriptionFormProps) => {
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description || ''
  );

  const { customModalInputClasses } = constants;

  const { updateDescription } = useTasksContext();

  const handleOnSubmitDescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskDescription) {
      cancelEditing();
      return;
    }

    updateDescription(task.id, taskDescription);
    cancelEditing();
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleOnSubmitDescription}>
      <Textarea
        autoFocus
        className="w-full"
        classNames={customModalInputClasses}
        placeholder="Add a more detailed description"
        required
        radius="sm"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <div className="flex flex-row gap-1">
        <Button
          type="submit"
          size="sm"
          className="bg-secondaryBtn text-taskText rounded-sm"
        >
          Save
        </Button>
        <Button
          size="sm"
          variant="light"
          className="text-taskText rounded-sm"
          onClick={() => {
            setTaskDescription(task.description);
            cancelEditing();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskDescriptionForm;
