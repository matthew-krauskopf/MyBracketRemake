import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { loggedInGuard } from './guards/logged-in.guard';
import { Login } from './modules/auth/login/login';
import { Home } from './modules/home/home';
import { Settings } from './modules/settings/settings';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [loggedInGuard] },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'settings', component: Settings }
    ]
  }
];
