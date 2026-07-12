import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
//import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthEffects } from './modules/auth/state/auth.effects';
import { authReducer } from './modules/auth/state/auth.state';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    //provideAnimationsAsync(),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        name: 'MyBracketRemake',
        maxAge: 50,
        logOnly: !isDevMode(),
      }),
    )
  ]
};
