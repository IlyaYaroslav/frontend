import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserApi } from '../api/user.api';
import type { UserModel } from '../model/user.model';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly userApi = inject(UserApi);

  readonly loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadCurrentUser),
      switchMap(({ userId }) =>
        this.userApi.getCurrentUserInfo(userId).pipe(
          map((user: UserModel) => UserActions.loadCurrentUserSuccess({ user })),
          catchError((error: unknown) =>
            of(UserActions.loadCurrentUserFailure({ error })),
          ),
        ),
      ),
    ),
  );
}