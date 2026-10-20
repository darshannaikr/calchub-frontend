
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', Validators.required]
  });

  onLogin(): void {

    this.errorMessage.set('');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);

    this.authService.login(this.loginForm.getRawValue())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {

          sessionStorage.setItem(
            'calchub_access_token',
            response.accessToken
          );

          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {

          if (error.status === 401) {
            this.errorMessage.set(
              'Invalid email or password.'
            );
          } else if (error.status === 0) {
            this.errorMessage.set(
              'Cannot connect to the server.'
            );
          } else {
            this.errorMessage.set(
              'Login failed. Please try again.'
            );
          }
        }
      });
  }
}
