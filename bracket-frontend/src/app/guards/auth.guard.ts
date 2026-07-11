import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthFacade } from '../modules/auth/state/auth.facade';
import { AuthService } from '../modules/auth/state/auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  if (authService.getToken()) {
    return true;
  }

  authFacade.setRedirectUrl(state.url);
  router.navigate(['/login']);
  return false;
};
