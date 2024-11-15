'use client';
import { useState } from 'react';
import { TaskType } from '@/utils/types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Input,
} from '@nextui-org/react';
import { GrTextAlignFull } from 'react-icons/gr';
import { FaPager } from 'react-icons/fa';
import { useTasksContext } from '@/context/TasksContext';
import TaskDescriptionForm from './TaskDescriptionForm';
// import { MdOutlineEdit } from 'react-icons/md';

interface ModalProps {
  task: TaskType;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskModal = ({ task, isOpen, onOpenChange }: ModalProps) => {
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description || ''
  );
  const [title, setTitle] = useState<string>(task.title || '');

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);

  const { updateDescription, updateTitle } = useTasksContext();

  const handleOnSubmitDescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskDescription) {
      setIsEditing(false);
      return;
    }

    updateDescription(task.id, taskDescription);
    setIsEditing(false);
  };

  const handleOnSubmitTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      setIsTitleEditing(false);
      return;
    }

    updateTitle(task.id, title);
    setIsTitleEditing(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        setIsEditing(false);
        setIsTitleEditing(false);
      }}
    >
      <ModalContent className="bg-[#31393f] min-h-96">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row items-start gap-4 text-taskText p-7">
              <div>
                <FaPager size={17} className="mt-1" />
              </div>
              {isTitleEditing ? (
                <form
                  onSubmit={handleOnSubmitTitle}
                  className="flex flex-col gap-2 w-full"
                >
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
                        setIsTitleEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <h2
                  className="text-lg font-semibold"
                  onClick={() => setIsTitleEditing(true)}
                >
                  {task.title}
                </h2>
              )}
            </ModalHeader>
            <ModalBody className="text-taskText flex flex-col gap-4 p-7">
              <div className="flex flex-row justify-between items-center gap-4 text-taskText">
                <div className="flex flex-row  gap-4 text-taskText items-center">
                  <GrTextAlignFull size={17} className="mt-1" />
                  <h3 className="text-lg font-semibold">Description</h3>
                </div>
                {!task.description.length ||
                  (!isEditing && (
                    <Button
                      variant="light"
                      size="sm"
                      className="text-taskText rounded-sm bg-[#e2e6ee0f]"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  ))}
              </div>
              {!task.description.length ? (
                <TaskDescriptionForm
                  task={task}
                  taskDescription={taskDescription}
                  handleOnSubmitDescription={handleOnSubmitDescription}
                  setTaskDescription={setTaskDescription}
                  cancelEditing={() => setIsEditing(false)}
                />
              ) : (
                <>
                  {isEditing ? (
                    <TaskDescriptionForm
                      task={task}
                      taskDescription={taskDescription}
                      handleOnSubmitDescription={handleOnSubmitDescription}
                      setTaskDescription={setTaskDescription}
                      cancelEditing={() => setIsEditing(false)}
                    />
                  ) : (
                    <p className="text-sm">{task.description}</p>
                  )}
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="light" color="danger" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
