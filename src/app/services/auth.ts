
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  tokenType: string;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/auth';

  signup(request: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(
      `${this.apiUrl}/signup`,
      request
    );
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  getCurrentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      'http://localhost:8080/api/users/me'
    );
  }
}
