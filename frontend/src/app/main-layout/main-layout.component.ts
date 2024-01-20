import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  isLogged:Boolean = false;
  isClient:Boolean = false;

  constructor(private router: Router, private authService: AuthService){}

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  ngAfterContentChecked() {
    this.isLogged = this.authService.checkIsLoggedStatic();
    if (this.isLogged) {
      this.isClient = this.authService.getRole() == 'CLIENT';
    }
  }

  ngAfterViewInit() {
    this.isLogged = this.authService.checkIsLoggedStatic();
  }

  ngOnChanges() {
    this.isLogged = this.authService.checkIsLoggedStatic();
  }

  logout() {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['/']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToUserDashboard() {
    this.router.navigate(['/userdashboard']);
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
