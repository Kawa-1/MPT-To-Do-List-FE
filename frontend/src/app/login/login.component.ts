import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  emailValue: String = '';
  passwordValue: String = '';

  constructor(private router: Router, private loginService: LoginService) {}

  redirectToRegister(): void {
    this.router.navigate(['/register']);
  }

  onLogin(): void {
    this.loginService
      .authenticate(this.emailValue, this.passwordValue)
      .subscribe({
        next: (token) => {
          console.log(token);
        },
        error: (err) => console.error(err),
      });
  }
}
