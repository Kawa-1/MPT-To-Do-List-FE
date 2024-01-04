import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Subtask } from '../task.model';

@Component({
  selector: 'app-user-tasklist',
  templateUrl: './user-tasklist.component.html',
  styleUrls: ['./user-tasklist.component.css']
})

export class UserTasklistComponent implements OnInit {
  tasks: Task[] = [];
  subtasks: Subtask[] = [];
  selectedTask: Task | null = null;
  taskStatuses: string[] = ['todo', 'doing', 'done'];

  todo: Subtask[] = [];
  doing: Subtask[] = [];
  done: Subtask[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // temporary mock for uid
    this.taskService.getTasks(1).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  showTaskDetails(task: Task): void {
    this.selectedTask = task;
    this.taskService.getSubtasks(task.tid).subscribe((subtasks) => {
      this.subtasks = subtasks;
    });

    this.todo = this.filterSubtasksByStatus('todo');
    this.doing = this.filterSubtasksByStatus('doing');
    this.done = this.filterSubtasksByStatus('done');
  }

  filterSubtasksByStatus(status: string): Subtask[] {
    return this.subtasks?.filter((subtask) => subtask.status === status) || [];
  }
}