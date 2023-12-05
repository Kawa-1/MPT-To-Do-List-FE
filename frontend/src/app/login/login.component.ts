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
        next: (token) => {
          console.log(token);
          this.authService.setToken(token);
          this.authService.checkIsLogged().then((data) => console.log(data));
        },
        error: (err) => {
          console.error(err);
          this.showError = true;
          setTimeout(() => this.showError = false, 5000);
        },
      });
  }
}
