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
  task,
  taskDescription,
  handleOnSubmitDescription,
  setTaskDescription,
  cancelEditing,
}: TaskDescriptionFormProps) => {
  return (
    <form className="flex flex-col gap-2" onSubmit={handleOnSubmitDescription}>
      <Textarea
        autoFocus
        className="w-full"
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
        placeholder="Add a more detailed description"
        required
        radius="sm"
        onChange={(e) => setTaskDescription(e.target.value)}
        value={taskDescription}
      />
      <div className="flex flex-row gap-2">
        <Button
          radius="sm"
          size="sm"
          type="submit"
          className="bg-secondaryBtn text-taskText"
        >
          Save
        </Button>
        <Button
          radius="sm"
          size="sm"
          variant="light"
          className="text-taskText"
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
