import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginJwtComponent } from './login-jwt/login-jwt.component';
import { LoginZkpComponent } from './login-zkp/login-zkp.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-jwt', pathMatch: 'full' },
  { path: 'login-jwt', component: LoginJwtComponent },
  { path: 'login-zkp', component: LoginZkpComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/login-jwt' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
