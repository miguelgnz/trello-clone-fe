export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | string;

export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: string;
}

export interface ColumnType {
  id: TaskStatus;
  title: string;
}

export interface Background {
  id: string;
  color: string;
  emoji?: string;
}
