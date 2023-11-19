import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedOption: string;

  constructor(private taskService: TaskService) {
    this.selectedOption = 'MainPage';
  }

  handleOptionClick(option: string): void {
    this.selectedOption = option;
  }
}
