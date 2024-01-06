import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedOption: string;
  tasks:any;

  constructor(private taskService: TaskService) {
    this.selectedOption = 'MainPage';
    taskService.getAllTasks().subscribe({
      next: (tasks) => {this.tasks = tasks},
      error: (err) => console.log(err)
    })
  }

  handleOptionClick(option: string): void {
    this.selectedOption = option;
  }
}
