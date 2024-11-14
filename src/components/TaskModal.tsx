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
} from '@nextui-org/react';
import { GrTextAlignFull } from 'react-icons/gr';
import { FaPager } from 'react-icons/fa';
import { useTasksContext } from '@/context/TasksContext';
import TaskDescriptionForm from './TaskDescriptionForm';

interface ModalProps {
  task: TaskType;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskModal = ({ task, isOpen, onOpenChange }: ModalProps) => {
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { updateDescription } = useTasksContext();

  const handleOnSubmitDescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskDescription) {
      setIsEditing(false);
      return;
    }

    updateDescription(task.id, taskDescription);
    setTaskDescription('');
    setIsEditing(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        setIsEditing(false);
      }}
    >
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

              {/* FIX BEHAVIOR */}
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
