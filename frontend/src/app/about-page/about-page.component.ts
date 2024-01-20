import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-page',
  standalone: false,
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

  showSuccess: boolean = false;
  email: string = '';

  addNewsletter() {
    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 5000);
    this.email = '';
  }
}
