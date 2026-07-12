import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthActions } from './auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  selectRedirectUrl,
  selectRegisterLoading
} from './auth.selectors';
import { AuthenticationRequest, RegistrationRequest } from './auth.service';
import { AuthState } from './auth.state';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store<{ auth: AuthState }>);

  readonly isAuthenticated: Signal<boolean> = this.store.selectSignal(selectIsAuthenticated);
  readonly isLoading: Signal<boolean> = this.store.selectSignal(selectAuthLoading);
  readonly error: Signal<string | null> = this.store.selectSignal(selectAuthError);
  readonly redirectUrl: Signal<string | null> = this.store.selectSignal(selectRedirectUrl);
  readonly registerLoading: Signal<boolean> = this.store.selectSignal(selectRegisterLoading);

  login(request: AuthenticationRequest): void {
    this.store.dispatch(AuthActions.login({ request }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  setRedirectUrl(redirectUrl: string): void {
    this.store.dispatch(AuthActions.setRedirectUrl({ redirectUrl }));
  }

  register(request: RegistrationRequest): void {
    this.store.dispatch(AuthActions.register({ request }));
  }
}
