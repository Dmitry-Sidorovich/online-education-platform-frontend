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
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.email, this.password, this.role).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login-jwt']);
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
