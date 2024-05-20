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
