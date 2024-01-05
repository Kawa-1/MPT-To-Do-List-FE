export interface Task {
  tid: number;
  uid: number;
  name: string;
  description: string;
  subtasks?: Subtask[];
  created?: string;
}

export interface Subtask {
  sid: number;
  tid: number;
  name: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
}
