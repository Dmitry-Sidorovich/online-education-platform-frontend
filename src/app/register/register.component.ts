import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registerWithJWT() {
    this.authService.registerWithJWT(this.username, this.email, this.password).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Registration failed:', error);
      }
    );
  }

  registerWithZKP() {
    this.authService.registerWithZKP(this.username, this.email, this.password).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Registration failed:', error);
      }
    );
  }

  registerWithGithub() {
    this.authService.authenticateWithGithub();
  }

  navigateToJWTLogin() {
    this.router.navigate(['/login-jwt']);
  }

  navigateToZKPLogin() {
    this.router.navigate(['/login-zkp']);
  }
}
