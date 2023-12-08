import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Subtask } from '../task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})

export class TasklistComponent implements OnInit {
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

  drop(event: any, status: 'todo' | 'doing' | 'done'): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    const droppedSubtaskId = event.item.data.sid;
    const subtask = this.subtasks.find(st => st.sid === droppedSubtaskId);
    if (subtask) {
      subtask.status = status;
    }
    this.taskService.updateSubtaskStatus(droppedSubtaskId, status);
  }

}