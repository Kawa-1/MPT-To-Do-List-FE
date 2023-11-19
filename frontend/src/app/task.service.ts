import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from './task.model';
import { Subtask } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor() {
    const sampleSubTasks: Subtask[] = [
        { id: 1, name: 'SubTask 1', description: 'Description for SubTask 1', status: "Done" },
        { id: 2, name: 'SubTask 2', description: 'Description for SubTask 2', status: "Doing" },
        { id: 3, name: 'SubTask 3', description: 'Description for SubTask 3', status: "ToDo" }
      ];

    const sampleTasks: Task[] = [
      { id: 1, name: 'Task 1', description: 'Description for Task 1', subtasks: [sampleSubTasks[0], sampleSubTasks[1]] },
      { id: 2, name: 'Task 2', description: 'Description for Task 2', subtasks: [sampleSubTasks[2]] },
      { id: 3, name: 'Task 3', description: 'Description for Task 3', subtasks: [] }
    ];

    this.tasks.next(sampleTasks);
  }

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  addTask(task: Task): void {
    const currentTasks = this.tasks.value;
    currentTasks.push(task);
    this.tasks.next(currentTasks);
  }
}
