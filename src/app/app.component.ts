import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = !!this.authService.getToken();
  }

  isLoginPage(): boolean {
    return this.router.url === '/login-jwt' || this.router.url === '/register' || this.router.url === '/login-zkp';
  }
}
