import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  username: string | null = '';

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.username = this.authService.getUsername();
      }
    });
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login-jwt']);
  }

  shouldShowNavbar(): boolean {
    return !['/login-jwt', '/login-zkp', '/register'].includes(this.router.url);
  }
}
