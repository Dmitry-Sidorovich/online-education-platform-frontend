import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-jwt',
  templateUrl: './login-jwt.component.html',
  styleUrls: ['./login-jwt.component.scss']
})
export class LoginJwtComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  receiveMessage(event: MessageEvent) {
    if (event.origin === 'http://localhost:3001') {
      const { token, user } = event.data;
      if (token && user) {
        this.authService.handleAuthSuccess({ token, user });
        window.location.href = '/home'; // Перенаправляем на домашнюю страницу
      }
    }
  }

  login() {
    this.authService.loginWithJWT(this.email, this.password).subscribe(
      (response) => {
        this.authService.handleAuthSuccess(response);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

  loginWithGithub() {
    this.authService.authenticateWithGithub();
  }

  checkGithubAuth(): void {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      console.log('GitHub authentication successful');
      this.authService.handleAuthSuccess({ token, user: JSON.parse(user) });
    }
  }

  navigateToZKPLogin() {
    this.router.navigate(['/login-zkp']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
