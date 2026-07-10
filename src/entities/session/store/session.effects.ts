import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { SessionApi } from '../api/session.api';
import { isAccessTokenValid } from '../lib/is-access-token-valid';
import { SessionActions } from './session.actions';

const STORAGE_KEY = 'access_token';

function readToken(): string | null {
  const accessToken = localStorage.getItem(STORAGE_KEY);

  if (!isAccessTokenValid(accessToken)) {
    clearToken();
    return null;
  }

  return accessToken;
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
  private readonly sessionApi = inject(SessionApi);
  private readonly messagesService = inject(MessageService);
  private readonly router = inject(Router);

  readonly initSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.init),
      map(() => SessionActions.tokenLoaded({ accessToken: readToken() })),
    ),
  );

  readonly persistToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.loginSuccess, SessionActions.registerSuccess),
      tap(({ accessToken }) => saveToken(accessToken)),
    ), { dispatch: false },
  );

  readonly clearToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.logout, SessionActions.loginFailure),
      tap(() => clearToken()),
    ), { dispatch: false },
  );

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.login),
      switchMap(({ payload }) =>
        this.sessionApi.login(payload).pipe(
          map(({ accessToken }) => {
              if (!isAccessTokenValid(accessToken)) {
                return SessionActions.loginFailure({
                  error: new Error('Сервер вернул некорректный или просроченный access token'),
                });
              }

              return SessionActions.loginSuccess({ accessToken });
            },
          ),
          catchError((error) => of(SessionActions.loginFailure({ error }))),
        ),
      ),
    ),
  );

  readonly loginSuccessSideEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.loginSuccess),
      tap(() => {
        this.messagesService.add({
          severity: 'success',
          summary: 'Успех',
          detail: 'Вы успешно вошли в аккаунт',
        });

        void this.router.navigateByUrl('/tasks');
      }),
    ), { dispatch: false },
  );

  readonly loginFailureSideEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.loginFailure),
      tap(() => {
        this.messagesService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'При входе произошла ошибка',
        });
      }),
    ), { dispatch: false },
  );


  readonly register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.register),
      switchMap(({ payload }) =>
        this.sessionApi.register(payload).pipe(
          map(({ token }) => {
            if (!isAccessTokenValid(token)) {
              return SessionActions.registerFailure({
                error: new Error('Сервер вернул некорректный или просроченный access token'),
              });
            }

            return SessionActions.registerSuccess({ accessToken: token });
          }),
          catchError((error: unknown) => of(SessionActions.registerFailure({ error }))),
        ),
      ),
    ),
  );

  readonly registerSuccessSideEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.registerSuccess),
      tap(() => {
        this.messagesService.add({
          severity: 'success',
          summary: 'Успех',
          detail: 'Аккаунт успешно создан',
        });

        void this.router.navigateByUrl('/tasks');
      }),
    ), { dispatch: false },
  );

  readonly registerFailureSideEffects = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.registerFailure),
      tap(({ error }) => {
        const detail = error instanceof HttpErrorResponse && error.status === 409
          ? 'Пользователь с данной почтой уже зарегистрирован'
          : 'При регистрации произошла ошибка';

        this.messagesService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail,
        });
      }),
    ), { dispatch: false },
  );

  readonly redirectAfterLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.logout),
      tap(() => void this.router.navigateByUrl('/login')),
    ), { dispatch: false },
  );
}
