export const constants = {
  customInputClasses: {
    inputWrapper: [
      'bg-task',
      'group-data-[focus=true]:bg-task',
      'group-data-[hover=true]:bg-task',
      'group-data-[focus-visible=true]:ring-0',
    ],
    input: [
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
      'group-data-[has-value=true]:text-taskText',
    ],
  },
  BACKGROUNDS: [
    {
      id: 'bg-1',
      color: 'bg-gradient-to-r from-pink-500 to-yellow-500',
      emoji: '🌅',
    },
    {
      id: 'bg-2',
      color: 'bg-gradient-to-r from-slate-900 to-slate-700',
      emoji: '🌌',
    },
    {
      id: 'bg-3',
      color: 'bg-gradient-to-r from-blue-500 to-blue-400',
      emoji: '🌊',
    },
    {
      id: 'bg-4',
      color: 'bg-gradient-to-r from-pink-500 to-violet-600',
      emoji: '🌸',
    },
    {
      id: 'bg-5',
      color: 'bg-gradient-to-r from-emerald-500 to-lime-600',
      emoji: '🌿',
    },
    {
      id: 'bg-6',
      color: 'bg-gradient-to-r from-orange-600 to-orange-500',
      emoji: '🍊',
    },
    {
      id: 'bg-7',
      color: 'bg-gradient-to-r from-amber-200 to-yellow-400',
      emoji: '🌞',
    },
    {
      id: 'bg-8',
      color: 'bg-gradient-to-r from-rose-400 to-rose-500',
      emoji: '🌹',
    }
  ],
};
