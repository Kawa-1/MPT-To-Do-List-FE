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

  isLogged:boolean = false;

  constructor(private router: Router, private authService: AuthService){}

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  async ngOnInit() {
    this.isLogged = await this.authService.checkIsLogged();
  }

  async ngAfterViewInit() {
    this.isLogged = await this.authService.checkIsLogged();
  }

  async ngOnChanges() {
    this.isLogged = await this.authService.checkIsLogged();
  }

  logout() {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['/']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
