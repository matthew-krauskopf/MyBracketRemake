import { createReducer, on } from '@ngrx/store';

import { AuthActions } from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  redirectUrl: string | null;
}

const getInitialAuthState = (): AuthState => ({
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('auth_token') : false,
  loading: false,
  error: null,
  redirectUrl: null
});

export const initialAuthState = getInitialAuthState();

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state) => ({ ...state, loading: false, isAuthenticated: true, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, isAuthenticated: false, error })),
  on(AuthActions.logout, (state) => ({ ...state, isAuthenticated: false, loading: false, error: null })),
  on(AuthActions.setRedirectUrl, (state, { redirectUrl }) => ({ ...state, redirectUrl })),
  on(AuthActions.clearRedirectUrl, (state) => ({ ...state, redirectUrl: null }))
);
