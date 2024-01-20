import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  selectedOption: string;
  tasks: any;
  myTasks: any;

  constructor(private taskService: TaskService) {
    this.selectedOption = 'MainPage';
    taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => console.log(err),
    });
    taskService.getAssignedTaks().subscribe({
      next: (tasks) => {
        tasks.forEach((task) => task.uid = 10000);
        this.myTasks = tasks;
      },
      error: (err) => console.log(err),
    });
  }

  handleOptionClick(option: string): void {
    this.selectedOption = option;
  }

  moveToAssigned(event:any) {
    event.uid = 100;
    this.myTasks.push(event);
    this.tasks = this.tasks.filter((task:any) => task.tid != event.tid);
    console.log(this.tasks);
  }
}
