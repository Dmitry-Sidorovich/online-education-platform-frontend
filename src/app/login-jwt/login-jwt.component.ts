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

  // ngOnInit(): void {
  //   window.addEventListener('message', this.receiveMessage.bind(this), false);
  //
  // }
  ngOnInit(): void {
    this.handleAuthParams();
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  private handleAuthParams(): void {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      // Передаем данные в родительское окно через postMessage и закрываем дочернее окно
      if (window.opener) {
        window.opener.postMessage({ token, user: JSON.parse(user) }, window.opener.location.origin);
        window.close();
      } else {
        // Если это не дочернее окно, обрабатываем аутентификацию в этом окне
        this.authService.handleAuthSuccess({ token, user: JSON.parse(user) });
        this.router.navigate(['/home']);
      }
    }
  }

  private receiveMessage(event: MessageEvent) {
    if (event.origin === window.location.origin) {
      const { token, user } = event.data;
      if (token && user) {
        this.authService.handleAuthSuccess({ token, user });
        this.router.navigate(['/home']);
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
