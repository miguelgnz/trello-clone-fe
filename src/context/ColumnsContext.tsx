'use client';

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { ColumnType } from '@/utils/types';

interface ColumnsContextType {
  columns: ColumnType[];
  addColumn: (newColumn: ColumnType) => void;
  deleteColumn: (columnId: string) => void;
}

const ctx: ColumnsContextType = {
  columns: [],
  addColumn: () => {},
  deleteColumn: () => {},
};

export const ColumnsContext = createContext(ctx);

export const useColumnsContext = () => useContext(ColumnsContext);

const INITIAL_COLUMNS: ColumnType[] = [
  { id: 'TODO', title: 'TODO' },
  { id: 'IN_PROGRESS', title: 'IN PROGRESS' },
  { id: 'DONE', title: 'DONE' },
];

export const ColumnsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [columns, setColumns] = useState<ColumnType[]>(INITIAL_COLUMNS);

  //Set columns from local storage
  useEffect(() => {
    const storedColumns = localStorage.getItem('columns');
    if (storedColumns) {
      setColumns(JSON.parse(storedColumns));
    }
  }, []);

  //Save columns to local storage
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('columns', JSON.stringify(columns));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [columns]);

  const addColumn = (newColumn: ColumnType) => {
    setColumns((prevState) => {
      return [...prevState, newColumn];
    });
  };

  const deleteColumn = (columnId: string) => {
    setColumns((prevState) => {
      return prevState.filter((column) => column.id !== columnId);
    });
  };

  const value = {
    columns,
    addColumn,
    deleteColumn,
  };

  return (
    <ColumnsContext.Provider value={value}>{children}</ColumnsContext.Provider>
  );
};
