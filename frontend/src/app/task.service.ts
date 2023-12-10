import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from './task.model';
import { Subtask } from './task.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private subtasks: BehaviorSubject<Subtask[]> = new BehaviorSubject<Subtask[]>([]);

  constructor() {
    const sampleSubTasks: Subtask[] = [
        { sid: 1, tid: 1, name: 'SubTask 1', description: 'Description for SubTask 1', status: 'done' },
        { sid: 2, tid: 1, name: 'SubTask 2', description: 'Description for SubTask 2', status: 'doing' },
        { sid: 3, tid: 1, name: 'SubTask 3', description: 'Description for SubTask 3', status: 'todo' }
      ];

    const sampleTasks: Task[] = [
      { tid: 1, uid: 1, name: 'Task 1', description: 'Description for Task 1' },
      { tid: 2, uid: 1, name: 'Task 2', description: 'Description for Task 2' },
      { tid: 3, uid: 1, name: 'Task 3', description: 'Description for Task 3' }
    ];

    this.tasks.next(sampleTasks);
    this.subtasks.next(sampleSubTasks);
  }

  getTasks(uid: number):  BehaviorSubject<Task[]> {
    // fetch from backend instead
    const filteredTasks = this.tasks.pipe(
      map(tasks => tasks.filter(t => t.uid === uid))
    );

    const filteredTasksSubject = new BehaviorSubject<Task[]>([]);
    filteredTasks.subscribe(filteredTasks => {
      filteredTasksSubject.next(filteredTasks);
    });

    return filteredTasksSubject;
  }

  getSubtasks(tid: number): BehaviorSubject<Subtask[]> {
    // fetch from backend instead
    const filteredSubtasks = this.subtasks.pipe(
      map(subtasks => subtasks.filter(st => st.tid === tid))
    );

    const filteredSubtasksSubject = new BehaviorSubject<Subtask[]>([]);
    filteredSubtasks.subscribe(filteredSubtasks => {
      filteredSubtasksSubject.next(filteredSubtasks);
    });

    return filteredSubtasksSubject;
  }

  updateSubtaskStatus(sid: number, newStatus: 'todo' | 'doing' | 'done'): void {
    this.subtasks.next(
      this.subtasks.value.map(subtask => {
        if (subtask.sid === sid) {
          // push new info to backend or sth
          console.log("Status of task " + sid + " updated: " + newStatus);
          return { ...subtask, status: newStatus };
        }
        return subtask;
      })
    );
  }
}
