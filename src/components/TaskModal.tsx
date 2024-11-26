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
import TaskDescriptionForm from './TaskDescriptionForm';
import TaskTitleForm from './TaskTitleForm';

interface ModalProps {
  task: TaskType;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskModal = ({ task, isOpen, onOpenChange }: ModalProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      onClose={() => {
        setIsEditing(false);
        setIsTitleEditing(false);
      }}
    >
      <ModalContent className="bg-modal h-[540px] max-sm:w-[300px]">
        {(onClose) => (
          <>
            <ModalHeader
              id="theHeader"
              className="flex flex-row items-start gap-4 text-taskText h-[28%] p-[36px_36px_0_36px]"
            >
              <div>
                <FaPager size={17} className="mt-1" />
              </div>
              {isTitleEditing ? (
                <TaskTitleForm
                  task={task}
                  cancelEditing={() => setIsTitleEditing(false)}
                />
              ) : (
                <div className="h-[100%] overflow-hidden overflow-y-auto">
                  <h2
                    className="text-lg font-semibold"
                    onClick={() => setIsTitleEditing(true)}
                  >
                    {task.title}
                  </h2>
                </div>
              )}
            </ModalHeader>
            <ModalBody className="text-taskText flex flex-col gap-4 p-7 h-[60%]">
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
                  cancelEditing={() => setIsEditing(false)}
                />
              ) : (
                <div className="h-[100%] overflow-hidden overflow-y-auto">
                  {isEditing ? (
                    <TaskDescriptionForm
                      task={task}
                      cancelEditing={() => setIsEditing(false)}
                    />
                  ) : (
                    <p className="text-sm">{task.description}</p>
                  )}
                </div>
              )}
            </ModalBody>
            <ModalFooter className="h-[12%]">
              <Button
                variant="light"
                className="text-taskText"
                onClick={onClose}
              >
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
