import { inject, Injectable } from '@angular/core';
import { UserActions, UserApi, UserModel } from '@entities/user';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

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