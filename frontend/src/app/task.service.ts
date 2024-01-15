import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from './task.model';
import { Subtask } from './task.model';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private subtasks: BehaviorSubject<Subtask[]> = new BehaviorSubject<Subtask[]>(
    []
  );

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    const sampleSubTasks: Subtask[] = [
      {
        sid: 1,
        tid: 1,
        name: 'SubTask 1',
        description: 'Description for SubTask 1',
        status: 'done',
      },
      {
        sid: 2,
        tid: 1,
        name: 'SubTask 2',
        description: 'Description for SubTask 2',
        status: 'doing',
      },
      {
        sid: 3,
        tid: 1,
        name: 'SubTask 3',
        description: 'Description for SubTask 3',
        status: 'todo',
      },
    ];

    const sampleTasks: Task[] = [
      { tid: 1, uid: 1, name: 'Task 1', description: 'Description for Task 1' },
      { tid: 2, uid: 1, name: 'Task 2', description: 'Description for Task 2' },
      { tid: 3, uid: 1, name: 'Task 3', description: 'Description for Task 3' },
    ];

    this.tasks.next(sampleTasks);
    this.subtasks.next(sampleSubTasks);
  }

  getTasks(uid: number): BehaviorSubject<Task[]> {
    // fetch from backend instead
    const filteredTasks = this.tasks.pipe(
      map((tasks) => tasks.filter((t) => t.uid === uid))
    );

    const filteredTasksSubject = new BehaviorSubject<Task[]>([]);
    filteredTasks.subscribe((filteredTasks) => {
      filteredTasksSubject.next(filteredTasks);
    });

    return filteredTasksSubject;
  }

  getSubtasks(tid: number): Observable<Subtask[]> {
    return this.httpClient.get<Subtask[]>(URL + '/task/subtask/all', {
      headers: this.generateHeaders(),
      params: new HttpParams().set('tid', tid),
    });
  }

  updateSubtaskStatus(
    sid: number,
    newStatus: 'todo' | 'doing' | 'done'
  ): Observable<string> {
    return this.httpClient.put<string>(
      URL + '/task/subtask/update',
      {},
      {
        params: new HttpParams().set('sid', sid).set('status', newStatus),
        headers: this.authService.createAuthHeader(),
      }
    );
  }

  createTask(cid: string, name: string, description: string) {
    return this.httpClient.post<string>(
      URL + '/task/create',
      { cid: cid, name: name, description: description },
      { headers: this.authService.createAuthHeader() }
    );
  }

  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(URL + '/task/all', {
      headers: this.generateHeaders(),
    });
  }

  getAssignedTaks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(URL + '/task/assigned', {
      headers: this.generateHeaders(),
    });
  }

  assignTask(taskId: number): Observable<string> {
    return this.httpClient.put<string>(
      URL + '/task/assign',
      {},
      {
        params: { tid: taskId },
        headers: this.generateHeaders(),
      }
    );
  }

  createSubtask(
    tid: number,
    name: string,
    description: string
  ): Observable<string> {
    return this.httpClient.post<string>(
      URL + '/task/subtask/create',
      { tid: tid, name: name, description: description, status: 'todo' },
      {
        headers: this.generateHeaders(),
      }
    );
  }

  generateHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }
}

const URL: string = 'http://34.118.68.231:8090';
