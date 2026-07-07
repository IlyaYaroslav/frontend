import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { SessionActions } from './session.actions';

const STORAGE_KEY = 'access_token';

function readToken(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

function saveToken(token: string): void {
  localStorage.setItem(STORAGE_KEY, token);
}

function clearToken(): void {
  localStorage.removeItem(STORAGE_KEY);
}

@Injectable()
export class SessionEffects {
  private readonly actions$ = inject(Actions);

  readonly initSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.init),
      map(() => SessionActions.tokenLoaded({ accessToken: readToken() })),
    ),
  );

  readonly persistToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.loginSuccess),
      tap(({ accessToken }) => saveToken(accessToken)),
    ), { dispatch: false },
  );

  readonly clearToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.logout),
      tap(() => clearToken()),
    ), { dispatch: false },
  );
}
