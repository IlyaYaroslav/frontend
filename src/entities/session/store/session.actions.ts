import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SessionActions = createActionGroup({
  source: 'Session',
  events: {
    Init: emptyProps(),
    'Token Loaded': props<{ accessToken: string | null }>(),
    'Login Success': props<{ accessToken: string }>(),
    Logout: emptyProps(),
  },
});
