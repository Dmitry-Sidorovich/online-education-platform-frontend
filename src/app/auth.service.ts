import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api';
  private tokenKey = 'authToken';

  // constructor(private http: HttpClient, private router: Router) {
  //   this.handleHashParams();
  //   window.addEventListener('message', this.receiveMessage.bind(this), false);
  // }
  //
  // private handleHashParams() {
  //   const hash = window.location.hash.substring(1);
  //   const params = new URLSearchParams(hash);
  //   const token = params.get('token');
  //   const user = params.get('user');
  //
  //   if (token && user) {
  //     this.handleAuthSuccess({ token, user: JSON.parse(user) });
  //     window.location.hash = '';
  //   }
  // }
  //
  // private receiveMessage(event: MessageEvent) {
  //   if (event.origin === 'http://localhost:3001') {
  //     const { token, user } = event.data;
  //     if (token && user) {
  //       this.handleAuthSuccess({ token, user });
  //     }
  //   }
  // }

  constructor(private http: HttpClient, private router: Router) {
    this.handleGithubAuth();
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  private handleGithubAuth(): void {
    const token = localStorage.getItem('githubToken');
    const user = localStorage.getItem('githubUser');

    if (token && user) {
      this.handleAuthSuccess({ token, user: JSON.parse(user) });
      localStorage.removeItem('githubToken');
      localStorage.removeItem('githubUser');
    }
  }

  private receiveMessage(event: MessageEvent) {
    if (event.origin === window.location.origin) {
      const { token, user } = event.data;
      if (token && user) {
        this.handleAuthSuccess({ token, user });
        this.router.navigate(['/home']);
      }
    }
  }

  loginWithJWT(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  loginWithZKP(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/zkp-auth/login`, { username, password });
  }

  authenticateWithGithub(): void {
    const width = 600;
    const height = 700;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);

    window.open(
      `${this.apiUrl}/github-auth/github`,
      'GitHub Login',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  }

  registerWithJWT(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { username, email, password });
  }

  registerWithZKP(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/zkp-auth/register`, { username, email, password });
  }

  handleAuthSuccess(response: any) {
    console.log('Authentication successful:', response);
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.router.navigate(['/home']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
    this.router.navigate(['/login-jwt']);
  }

  getUsername(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser && parsedUser.username ? parsedUser.username : null;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
      }
    }
    return null;
  }
}
