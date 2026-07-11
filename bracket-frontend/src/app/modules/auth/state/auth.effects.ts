import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, ignoreElements, map, switchMap, tap } from 'rxjs/operators';

import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
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
      map(() =>
        this.router.navigate(['/home'])
      )
    ), {dispatch: false}
  );

  readonly logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.authService.logout()),
        ignoreElements()
      ),
    { dispatch: false }
  );
}
