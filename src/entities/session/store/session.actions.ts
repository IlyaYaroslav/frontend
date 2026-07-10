import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { LoginRequestModel, RegisterRequestModel } from '../model/session.model';

export const SessionActions = createActionGroup({
  source: 'Session',
  events: {
    Init: emptyProps(),

    'Token Loaded': props<{ accessToken: string | null }>(),

    Login: props<{ payload: LoginRequestModel }>(),
    'Login Success': props<{ accessToken: string }>(),
    'Login Failure': props<{ error: unknown }>(),

    Register: props<{ payload: RegisterRequestModel }>(),
    'Register Success': props<{ accessToken: string }>(),
    'Register Failure': props<{ error: unknown }>(),

    Logout: emptyProps(),
  },
});
