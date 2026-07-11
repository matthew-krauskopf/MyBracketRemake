import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AuthActions } from './auth.actions';
import { selectRedirectUrl } from './auth.selectors';
import { AuthService } from './auth.service';
import { AuthState } from './auth.state';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly store = inject(Store<{ auth: AuthState }>);
  private readonly router = inject(Router);

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ request }) =>
        this.authService.login(request).pipe(
          map(() => AuthActions.loginSuccess()),
          catchError(() => of(AuthActions.loginFailure({ error: 'Invalid username or password.' })))
        )
      )
    )
  );

  loginSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      withLatestFrom(this.store.select(selectRedirectUrl)),
      tap(([, redirectUrl]) => this.router.navigateByUrl(redirectUrl ?? '/home')),
      map(() => AuthActions.clearRedirectUrl())
    )
  );

  readonly logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.authService.logout()),
      map(() => AuthActions.logoutSuccess())
    )
  );

  logoutSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        map(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}
