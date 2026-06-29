import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppEffects, appFeature } from '@app/store';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { API_BASE_URL, USER_API_URL } from '@shared/api/api.tokens';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      [appFeature.name]: appFeature.reducer,
    }),
    provideEffects(AppEffects),
    provideHttpClient(),
    {
      provide: API_BASE_URL,
      useValue: '/api'
    },
    {
      provide: USER_API_URL,
      useFactory: (baseURL: string) => `${baseURL}/user-service/users`,
      deps: [API_BASE_URL]
    }
  ]
};
