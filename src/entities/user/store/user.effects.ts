import { inject, Injectable } from '@angular/core';
import { selectUserId } from '@entities/session';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { UserApi } from '../api/user.api';
import type { UploadUserAvatarResponse, UserModel } from '../model/user.model';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly userApi = inject(UserApi);
  private readonly store = inject(Store);
  private readonly messageService = inject(MessageService);

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

  readonly uploadAvatar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.uploadAvatar),
      concatLatestFrom(() => this.store.select(selectUserId)),
      switchMap(([{ file }, userId]) => {
        if (!userId) {
          return of(UserActions.uploadAvatarFailure({
            error: new Error('Произошла ошибка при получении данных пользователя'),
          }));
        }

        return this.userApi.uploadUserAvatar({ file, id: userId }).pipe(
          map((patch: UploadUserAvatarResponse) => UserActions.uploadAvatarSuccess({ patch })),
          catchError((error: unknown) => of(UserActions.uploadAvatarFailure({ error }))),
        );
      }),
    ),
  );

  readonly uploadAvatarSuccessSideEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.uploadAvatarSuccess),
      tap(() => {
        this.messageService.add({
          summary: 'Успех',
          detail: 'Фото профиля успешно загружено',
          severity: 'success',
        });
      }),
    ), { dispatch: false },
  );

  readonly uploadAvatarFailureEffects = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.uploadAvatarFailure),
      tap(() => {
        this.messageService.add({
          summary: 'Ошибка',
          detail: 'При загрузке фото произошла ошибка',
          severity: 'error',
        });
      }),
    ), { dispatch: false },
  );

  readonly deleteAvatar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteAvatar),
      concatLatestFrom(() => this.store.select(selectUserId)),
      switchMap(([_, userId]) => {
          if (!userId) {
            return of(UserActions.deleteAvatarFailure({
              error: new Error('Произошла ошибка при получении данных пользователя'),
            }));
          }

          return this.userApi.deleteUserAvatar(userId).pipe(
            map(() => UserActions.deleteAvatarSuccess()),
            catchError((error: unknown) => of(UserActions.deleteAvatarFailure({ error }))),
          );
        },
      ),
    ),
  );

  readonly deleteAvatarSuccessSideEffects = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteAvatarSuccess),
      tap(() => {
        this.messageService.add({
          summary: 'Успех',
          detail: 'Удаление фото профиля успешно произведено',
          severity: 'success',
        });
      }),
    ), { dispatch: false },
  );

  readonly deleteAvatarFailureSideEffects = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteAvatarFailure),
      tap(() => {
        this.messageService.add({
          summary: 'Ошибка',
          detail: 'При удалении фото профиля произошла ошибка',
          severity: 'error',
        });
      }),
    ), { dispatch: false },
  );
}