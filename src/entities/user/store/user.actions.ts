import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  UpdateUserAvatarResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  UserModel,
} from '../model/user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Current User': props<{ userId: string }>(),
    'Load Current User Success': props<{ user: UserModel }>(),
    'Load Current User Failure': props<{ error: unknown }>(),

    'Update Current User': props<{
      payload: UpdateUserProfileRequest
    }>(),
    'Update Current User Success': props<{ patch: UpdateUserProfileResponse }>(),
    'Update Current User Failure': props<{ error: unknown }>(),

    'Update Avatar': props<{ file: File }>(),
    'Update Avatar Success': props<{ patch: UpdateUserAvatarResponse }>(),
    'Update Avatar Failure': props<{ error: unknown }>(),

    'Delete Avatar': emptyProps(),
    'Delete Avatar Success': emptyProps(),
    'Delete Avatar Failure': props<{ error: unknown }>(),

    'Clear Current User': emptyProps(),
  },
});