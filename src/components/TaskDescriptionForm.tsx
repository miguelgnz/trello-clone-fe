import { TaskType } from '@/utils/types';
import { Button, Textarea } from '@nextui-org/react';

interface TaskDescriptionFormProps {
  task: TaskType;
  taskDescription: string;
  handleOnSubmitDescription: (e: React.FormEvent<HTMLFormElement>) => void;
  setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  cancelEditing: () => void;
}

const TaskDescriptionForm = ({
  // task,
  taskDescription,
  handleOnSubmitDescription,
  setTaskDescription,
  cancelEditing,
}: TaskDescriptionFormProps) => {
  return (
    <form className="flex flex-col gap-2" onSubmit={handleOnSubmitDescription}>
      <Textarea
        required
        placeholder="Add a more detailed description"
        className="w-full"
        // classNames={constants.customInputClasses}
        radius="sm"
        onChange={(e) => setTaskDescription(e.target.value)}
        value={taskDescription}
      />
      <div className="flex flex-row gap-2">
        <Button
          radius="sm"
          type="submit"
          className="bg-secondaryBtn text-taskText"
        >
          Save
        </Button>
        <Button
          radius="sm"
          variant="light"
          className="text-taskText"
          onClick={() => {
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
