export interface Task {
  id: number;
  name: string;
  description: string;
  subtasks?: Subtask[];
}

export interface Subtask {
  id: number;
  name: string;
  description: string;
  status: 'ToDo' | 'Doing' | 'Done';
}
