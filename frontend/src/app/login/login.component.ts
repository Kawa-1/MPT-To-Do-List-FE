import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  emailValue: String = '';
  passwordValue: String = '';
  showError: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  redirectToRegister(): void {
    this.router.navigate(['/register']);
  }

  async onLogin(): Promise<void> {
    this.loginService
      .authenticate(this.emailValue, this.passwordValue)
      .subscribe({
        next: (response) => {
          this.authService.setToken(response.jwt);
          this.authService.setRole(response.role);
          this.authService
            .checkIsLogged()
            .then(() => this.redirectToDashboard(this.authService.getRole()));
        },
        error: () => {
          this.showError = true;
          setTimeout(() => (this.showError = false), 5000);
        }
      });
  }

  redirectToDashboard(role: string) {
    if (role === CLIENT_ROLE) {
      this.router.navigate(['/userdashboard']);
      return;
    }
    this.router.navigate(['/dashboard']);
  }
}

const CLIENT_ROLE: string = 'CLIENT';
const MECHANIC_ROLE: string = 'MECHANIC';
