import { Routes } from '@angular/router';

import { loggedInGuard } from './guards/logged-in.guard';
import { Login } from './modules/auth/login/login';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [loggedInGuard] }
];
