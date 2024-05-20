import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-zkp',
  templateUrl: './login-zkp.component.html',
  styleUrls: ['./login-zkp.component.scss']
})
export class LoginZkpComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.loginWithZKP(this.username, this.password).subscribe(
      (response) => {
        this.authService.handleAuthSuccess(response);
        this.router.navigate(['/home']); // Перенаправляем на домашнюю страницу
      },
      (error) => {
        console.error('Login with ZKP failed:', error);
      }
    );
  }

  loginWithGithub() {
    this.authService.authenticateWithGithub();
  }

  navigateToJWTLogin() {
    this.router.navigate(['/login-jwt']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
