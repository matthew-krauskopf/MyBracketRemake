import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { loggedInGuard } from './guards/logged-in.guard';
import { Login } from './modules/auth/login/login';
import { Home } from './modules/home/home';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [loggedInGuard] },
  { path: 'home', component: Home, canActivate: [authGuard] }
];
