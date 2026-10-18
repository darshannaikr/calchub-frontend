import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  onLogin(event: SubmitEvent): void {
    event.preventDefault();
    alert('Login form submitted! Backend integration comes next.');
  }
}
