import { HttpErrorResponse } from '@angular/common/http';
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
import { MatSnackBar } from '@angular/material/snack-bar';

const SNACKBAR_DURATION_MS = 5000;

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly store = inject(Store<{ auth: AuthState }>);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

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

  readonly register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ request }) =>
        this.authService.register(request).pipe(
          map(() => AuthActions.registerSuccess()),
          catchError((err: HttpErrorResponse) =>
            of(AuthActions.registerFailure({ error: err.error?.message ?? 'Unable to create account. Please try again.' }))
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.snackBar.open('Account created successfully. Please log in.', 'Close', {
            duration: SNACKBAR_DURATION_MS
          });
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerFailure),
        tap(({ error }) => {
          this.snackBar.open(error, 'Close', { duration: SNACKBAR_DURATION_MS });
        })
      ),
    { dispatch: false }
  );
}
