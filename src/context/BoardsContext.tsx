'use client';

import { ColumnType, TaskStatus, TaskType } from '@/utils/types';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Board } from '@/utils/types';

interface BoardsContextType {
  boards: Board[];
  selectedBoard: Board;
  boardsLoading: boolean;
  onChangeSelectedBoard: (boardId: string) => void;
  setTaskOnDragEvent: (taskId: string, newStatus: TaskStatus) => void;
  addTask: (newTask: TaskType) => void;
  deleteTask: (taskId: string) => void;
  updateTaskTitle: (taskId: string, newTitle: string) => void;
  updateTaskDescription: (taskId: string, newDescription: string) => void;
  addColumn: (newColumn: ColumnType) => void;
  deleteColumn: (columnId: string) => void;
  addBoard: (boardTitle: string) => void;
  editBoardTitle: (newTitle: string) => void;
}

const ctx: BoardsContextType = {
  boards: [],
  selectedBoard: {
    id: '',
    title: '',
    columns: [],
    tasks: [],
  },
  boardsLoading: true,
  onChangeSelectedBoard: () => {},
  setTaskOnDragEvent: () => {},
  addTask: () => {},
  deleteTask: () => {},
  updateTaskTitle: () => {},
  updateTaskDescription: () => {},
  addColumn: () => {},
  deleteColumn: () => {},
  addBoard: () => {},
  editBoardTitle: () => {},
};

const BoardsContext = createContext(ctx);

export const useBoardsContext = () => useContext(BoardsContext);

const INITIAL_COLUMNS: ColumnType[] = [
  {
    id: 'TODO',
    title: 'TODO',
  },
  { id: 'IN_PROGRESS', title: 'IN PROGRESS' },
  { id: 'DONE', title: 'DONE' },
];

const INITIAL_BOARDS: Board[] = [
  {
    id: '1',
    title: 'Board 1',
    columns: INITIAL_COLUMNS,
    tasks: [],
  },
];

export const BoardsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [boards, setBoards] = useState<Board[]>(() => {
    return INITIAL_BOARDS;
  });

  const [selectedBoard, setSelectedBoard] = useState<Board>(boards[0]);
  const [boardsLoading, setBoardsLoading] = useState<boolean>(true);

  // Save the boards to localStorage
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('boards', JSON.stringify(boards));
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [boards]);

  // Load the boards from localStorage
  useEffect(() => {
    const boardsFromLocalStorage = localStorage.getItem('boards');

    if (boardsFromLocalStorage) {
      setBoards(JSON.parse(boardsFromLocalStorage));
    }

    setBoardsLoading(false);
  }, []);

  // Update the selectedBoard when the boards change
  useEffect(() => {
    setSelectedBoard((prevState) => {
      //Should return the first board if there's no different board selected by the user
      return boards.find((board) => board.id === prevState.id) || boards[0];
    });
  }, [boards, selectedBoard]);

  const setTaskOnDragEvent = (taskId: string, newStatus: TaskStatus) => {
    const updatedBoards = boards.map((board) => {
      return board.id === selectedBoard.id
        ? {
            ...board,
            tasks: board.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    status: newStatus,
                  }
                : task
            ),
          }
        : board;
    });

    setBoards(updatedBoards);
  };

  const addTask = (task: TaskType) => {
    setBoards((prevState) => {
      return prevState.map((board) => {
        return board.id === selectedBoard.id
          ? {
              ...board,
              tasks: [...board.tasks, task],
            }
          : board;
      });
    });
  };

  const deleteTask = (taskId: string) => {
    setBoards((prevState) => {
      return prevState.map((board) => {
        return board.id === selectedBoard.id
          ? {
              ...board,
              tasks: board.tasks.filter((task) => task.id !== taskId),
            }
          : board;
      });
    });
  };

  const updateTaskTitle = (taskId: string, newTitle: string) => {
    setBoards((prevState) => {
      return prevState.map((board) => {
        return board.id === selectedBoard.id
          ? {
              ...board,
              tasks: board.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      title: newTitle,
                    }
                  : task
              ),
            }
          : board;
      });
    });
  };

  const updateTaskDescription = (taskId: string, newDescription: string) => {
    setBoards((prevState) => {
      return prevState.map((board) => {
        return board.id === selectedBoard.id
          ? {
              ...board,
              tasks: board.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      description: newDescription,
                    }
                  : task
              ),
            }
          : board;
      });
    });
  };

  const addColumn = (newColumn: ColumnType) => {
    setBoards((prevState) => {
      return prevState.map((board) => {
        return board.id === selectedBoard.id
          ? {
              ...board,
              columns: [...board.columns, newColumn],
            }
          : board;
      });
    });
  };

  const deleteColumn = (columnId: string) => {
    setBoards((prevState) => {
      return prevState.map((board) => {
        return board.id === selectedBoard.id
          ? {
              ...board,
              columns: board.columns.filter((column) => column.id !== columnId),
            }
          : board;
      });
    });
  };

  const onChangeSelectedBoard = (boardId: string) => {
    const board = boards.find((board) => board.id === boardId);
    if (!board) return;

    setSelectedBoard(board);
  };

  const addBoard = (boardTitle: string) => {
    setBoards((prevState) => {
      return [
        ...prevState,
        {
          id: Math.random().toString(36).substr(2, 9),
          title: boardTitle,
          columns: INITIAL_COLUMNS,
          tasks: [],
        },
      ];
    });
  };

  const editBoardTitle = (newTitle: string) => {
    setBoards((prevState) => {
      return prevState.map((board) =>
        board.id === selectedBoard.id ? { ...board, title: newTitle } : board
      );
    });
  };

  const value = {
    boards,
    selectedBoard,
    boardsLoading,
    setTaskOnDragEvent,
    onChangeSelectedBoard,
    addTask,
    deleteTask,
    updateTaskTitle,
    updateTaskDescription,
    addColumn,
    deleteColumn,
    addBoard,
    editBoardTitle,
  };

  return (
    <BoardsContext.Provider value={value}>{children}</BoardsContext.Provider>
  );
};
