import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppEffects, appFeature } from '@app/store';
import { AuthInterceptor, SessionEffects, sessionFeature } from '@entities/session';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { API_BASE_URL, USER_API_URL } from '@shared/api/api.tokens';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      [appFeature.name]: appFeature.reducer,
      [sessionFeature.name]: sessionFeature.reducer,
    }),
    provideEffects(AppEffects, SessionEffects),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: API_BASE_URL,
      useValue: '/api',
    },
    {
      provide: USER_API_URL,
      useFactory: (baseURL: string) => `${ baseURL }/user-service/users`,
      deps: [API_BASE_URL],
    },
    providePrimeNG({
      ripple: true,
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              50: '#fafafa',
              100: '#f4f4f5',
              200: '#e4e4e7',
              300: '#d4d4d8',
              400: '#a1a1aa',
              500: '#71717a',
              600: '#52525b',
              700: '#3f3f46',
              800: '#27272a',
              900: '#18181b',
              950: '#09090b',
            },
          },
        }),
        options: {
          darkModeSelector: '[data-mode=\'dark\']',
        },
      },
    }),
    MessageService 
  ],
};
