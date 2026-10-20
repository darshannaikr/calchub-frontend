
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private readonly router = inject(Router);

  readonly showCalculations = signal(false);
  readonly showProfileMenu = signal(false);

  openCalculations(): void {
    this.showCalculations.set(true);
  }

  toggleProfile(): void {
    this.showProfileMenu.update(value => !value);
  }

  logout(): void {
    sessionStorage.removeItem('calchub_access_token');
    this.router.navigate(['/login']);
  }

  addCalculation(): void {
    // We will implement this route with Flask integration.
    console.log('Add New Calculation clicked');
  }
}
