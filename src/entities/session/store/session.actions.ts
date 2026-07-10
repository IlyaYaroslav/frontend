import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { LoginRequest } from '../model/session.model';

export const SessionActions = createActionGroup({
  source: 'Session',
  events: {
    Init: emptyProps(),

    'Token Loaded': props<{ accessToken: string | null }>(),

    Login: props<{ payload: LoginRequest }>(),
    'Login Success': props<{ accessToken: string }>(),
    'Login Failure': props<{ error: unknown }>(),
    
    Logout: emptyProps(),
  },
});
