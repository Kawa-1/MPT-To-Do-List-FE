import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrl: './client-orders.component.css'
})
export class ClientOrdersComponent {
  tasks:any;
  constructor(taskService: TaskService) {
    taskService.getAllTasks().subscribe({
      next: (tasks) => {this.tasks = tasks},
      error: (err) => console.log(err)
    })
  }
}
