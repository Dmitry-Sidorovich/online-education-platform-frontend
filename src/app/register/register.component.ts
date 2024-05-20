import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  registerWithJWT() {
    this.authService.registerWithJWT(this.username, this.email, this.password).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        localStorage.setItem('authToken', response.token);
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 5000, // Уведомление будет отображаться 5 секунд
          verticalPosition: 'top',
        });
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Registration failed:', error);
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 5000, // Уведомление будет отображаться 5 секунд
          verticalPosition: 'top',
        });
      }
    );
  }

  registerWithZKP() {
    this.authService.registerWithZKP(this.username, this.email, this.password).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        localStorage.setItem('authToken', response.token);
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 5000, // Уведомление будет отображаться 5 секунд
          verticalPosition: 'top',
        });
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Registration failed:', error);
        this.snackBar.open('Registration failed!', 'Close', {
          duration: 5000, // Уведомление будет отображаться 5 секунд
          verticalPosition: 'top',
        });
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
