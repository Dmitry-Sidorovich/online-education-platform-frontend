import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient, private router: Router) {}

  loginWithJWT(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  authenticateWithGithub(): void {
    const width = 600;
    const height = 700;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);

    const authWindow = window.open(
      `${this.apiUrl}/github-auth/github`,
      'GitHub Login',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'http://localhost:3001') {
        const { token, user } = event.data;
        if (token && user) {
          this.handleAuthSuccess({ token, user });
          if (authWindow) {
            authWindow.close();
          }
        }
      }
    };

    window.addEventListener('message', handleMessage, false);
  }

  registerWithJWT(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { username, email, password });
  }

  registerWithZKP(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/zkp-auth/register`, { username, email, password });
  }

  loginWithZKP(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/zkp-auth/login`, { username, password });
  }

  handleAuthSuccess(response: any) {
    console.log('Authentication successful:', response);
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.router.navigate(['/home']);
  }
}
