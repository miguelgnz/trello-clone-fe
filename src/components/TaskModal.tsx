'use client';
import { useState } from 'react';
import { TaskType } from '@/utils/types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea,
  Button,
  ModalFooter,
} from '@nextui-org/react';
import { GrTextAlignFull } from 'react-icons/gr';
import { FaPager } from 'react-icons/fa';
import { useTasksContext } from '@/context/TasksContext';

interface ModalProps {
  task: TaskType;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskModal = ({ task, isOpen, onOpenChange }: ModalProps) => {
  const [taskDescription, setTaskDescription] = useState<string>('');
  const { updateDescription } = useTasksContext();

  const handleOnSubmitDescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateDescription(task.id, taskDescription);
    setTaskDescription('');
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="bg-task min-h-96">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row items-start gap-4 text-taskText">
              <div>
                <FaPager size={17} className="mt-1" />
              </div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
            </ModalHeader>
            <ModalBody className="text-taskText flex flex-col gap-4">
              <div className="flex flex-row items-start gap-4 text-taskText">
                <GrTextAlignFull size={17} className="mt-1" />
                <h3 className="text-lg font-semibold">Description</h3>
              </div>
              {!task.description.length ? (
                <form
                  className="flex flex-col gap-2"
                  onSubmit={handleOnSubmitDescription}
                >
                  <Textarea
                    required
                    placeholder="Add a more detailed description"
                    className="w-full"
                    classNames={{
                      inputWrapper: [
                        'bg-task',
                        'group-data-[focus=true]:bg-task',
                        'group-data-[hover=true]:bg-task',
                      ],
                      input: ['text-taskText'],
                    }}
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
                  </div>
                </form>
              ) : (
                <p className="text-sm">{task.description}</p>
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
