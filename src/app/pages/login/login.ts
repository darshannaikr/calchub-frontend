import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  onLogin(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      console.log('Login form validation failed');
      return;
    }

    console.log('Login form validation successful');

    console.log('Login form submitted successfully!');
  }
}
