import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrl: './client-orders.component.css'
})
export class ClientOrdersComponent {
  @Input()
  tasks:any;

  constructor() {

  }
}
