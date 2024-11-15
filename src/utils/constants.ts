export const constants = {
  customInputClasses: {
    inputWrapper: [
      'bg-task',
      'group-data-[focus=true]:bg-task',
      'group-data-[hover=true]:bg-task',
      'group-data-[focus-visible=true]:ring-0',
    ],
    input: [
      'placeholder:text-default-700/50',
      'group-data-[has-value=true]:text-taskText',
    ],
  },
  customModalInputClasses: {
    inputWrapper: [
      'bg-modalInput',
      'group-data-[focus=true]:bg-modalInput',
      'group-data-[hover=true]:bg-modalInput',
      'group-data-[focus-visible=true]:ring-0',
    ],
    input: [
      'placeholder:text-default-700/50',
      'group-data-[has-value=true]:text-taskText',
    ],
  },
};
