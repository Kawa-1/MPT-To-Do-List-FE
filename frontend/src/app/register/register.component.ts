import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterWrapper } from '../login.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  clientRegister: boolean = true;

  clientName: String = '';
  clientAddress: String = '';
  clientPhone: String = '';
  clientMail: String = '';
  clientPassword: String = '';
  clientConfirmPassword: String = '';

  mechanicName: String = '';
  mechanicAddress: String = '';
  mechanicSpec: String = '';
  mechanicMail: String = '';
  mechanicPassword: String = '';
  mechanicConfirmPassword: String = '';

  passwordMatch: Boolean = true;
  showError: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {}

  changeClientType(event: any): void {
    let buttonId = event.target.id;
    event.target.classList.add(SELECTED_TYPE_OF_CLIENT);
    if (buttonId === REGISTER_AS_MECHANIC_ID) {
      this.clientRegister = false;
      document
        .querySelector('#' + REGISTER_AS_CLIENT)
        ?.classList.remove(SELECTED_TYPE_OF_CLIENT);
      return;
    }
    this.clientRegister = true;
    document
      .querySelector('#' + REGISTER_AS_MECHANIC_ID)
      ?.classList.remove(SELECTED_TYPE_OF_CLIENT);
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  onRegister(): void {
    if (this.clientRegister) {
      this.standardClientRegister();
      return;
    }
    this.mechanicRegister();
  }

  standardClientRegister() {
    if (this.clientPassword !== this.clientConfirmPassword) {
      this.showPasswordsDontMatchError();
      return;
    }
    let newUserData: RegisterWrapper = {
      // clientType: 'Standard',
      // clientAddress: this.clientAddress,
      username: this.clientMail,
      // clientName: this.clientName,
      password: this.clientPassword,
      // clientPhone: this.clientPhone,
      // clientSpec: '',
    };
    this.loginService.register(newUserData).subscribe({
      next: (data) => console.log(data),
      error: (err) => {console.error(err);
        this.showError = true;
        setTimeout(() => this.showError = false, 5000);},
    });
  }

  mechanicRegister() {
    if (this.mechanicPassword !== this.mechanicConfirmPassword) {
      this.showPasswordsDontMatchError();
      return;
    }
    let newUserData: RegisterWrapper = {
      // clientType: 'Mechanic',
      // clientAddress: this.mechanicAddress,
      username: this.mechanicMail,
      // clientName: this.mechanicName,
      password: this.mechanicPassword,
      // clientPhone: '',
      // clientSpec: this.mechanicSpec,
    };
    this.loginService.register(newUserData).subscribe({
      next: (data) => console.log(data),
      error: (err) => {
        console.error(err);
          this.showError = true;
          setTimeout(() => this.showError = false, 5000);
      },
    });
  }

  showPasswordsDontMatchError() {
    this.passwordMatch = false;
  }
}

const REGISTER_AS_MECHANIC_ID = 'registerAsMechanic';
const REGISTER_AS_CLIENT = 'registerAsClient';
const SELECTED_TYPE_OF_CLIENT = 'selectedTypeOfClient';
