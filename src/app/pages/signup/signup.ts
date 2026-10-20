
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  submitted = false;
  showPassword = false;
  showConfirmPassword = false;

  signupForm = new FormGroup(
    {
      firstName: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(50)
        ]
      }),

      lastName: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(50)
        ]
      }),

      email: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email
        ]
      }),

      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(8)
        ]
      }),

      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required
        ]
      })
    },
    {
      validators: [Signup.passwordMatchValidator]
    }
  );

  static passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  isInvalid(fieldName: keyof Signup['signupForm']['controls']): boolean {
    const control = this.signupForm.controls[fieldName];

    return control.invalid &&
      (control.touched || this.submitted);
  }

  onSignup(): void {
    this.submitted = true;
    this.signupForm.markAllAsTouched();

    if (this.signupForm.invalid) {
      console.log('Signup form validation failed');
      return;
    }

    const { firstName, lastName, email } =
      this.signupForm.getRawValue();

    console.log('Signup form validation successful', {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim()
    });

    // Next step:
    // Call Spring Boot POST /api/auth/signup.
    // Do not log or store plaintext passwords.
  }
}
