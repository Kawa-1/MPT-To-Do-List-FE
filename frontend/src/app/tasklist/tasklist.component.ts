import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Subtask } from '../task.model';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})

export class TasklistComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  taskStatuses: string[] = ['ToDo', 'Doing', 'Done'];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  showTaskDetails(task: Task): void {
    this.selectedTask = task;
  }

  filterSubtasksByStatus(status: string): Subtask[] {
    return this.selectedTask?.subtasks?.filter((subtask) => subtask.status === status) || [];
  }
}