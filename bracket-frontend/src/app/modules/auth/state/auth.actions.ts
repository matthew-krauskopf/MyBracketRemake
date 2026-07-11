import { createAction, props } from '@ngrx/store';

import { AuthenticationRequest } from './auth.service';

export const AuthActions = {
  login: createAction('[Auth] Login', props<{ request: AuthenticationRequest }>()),
  loginSuccess: createAction('[Auth] Login Success'),
  loginFailure: createAction('[Auth] Login Failure', props<{ error: string }>()),
  logout: createAction('[Auth] Logout'),
  logoutSuccess: createAction('[Auth] Logout Success'),
  setRedirectUrl: createAction('[Auth] Set Redirect Url', props<{ redirectUrl: string }>()),
  clearRedirectUrl: createAction('[Auth] Clear Redirect Url')
};
