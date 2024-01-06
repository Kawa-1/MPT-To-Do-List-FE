import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from './task.model';
import { Subtask } from './task.model';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  getTasks():  Observable<Task[]> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<{ tasks: Task[] }>(URL + '/task/all', { headers })
      .pipe(
        map(response => response.tasks)
      );
  }

  getSubtasks(tid: number): Observable<Subtask[]> {
    const token = this.cookieService.get('Token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
      body: { tid: tid }
    };

    return this.http.get<{ subtasks: Subtask[] }>(URL + '/task/subtask/all', options)
      .pipe(
        map(response => response.subtasks)
      );
  }

  updateSubtaskStatus(subtask: Subtask, newStatus: 'todo' | 'doing' | 'done'): Observable<any> {
    const token = this.cookieService.get('Token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }),
      body: {
        sid: subtask.sid,
        tid: subtask.tid,
        name: subtask.name,
        describtion: subtask.description,
        status: newStatus
      }
    };

    return this.http.post<{ subtask: Subtask }>(URL + '/task/subtask/update', options);
  }
}

const URL = 'http://127.0.0.1:8000';

