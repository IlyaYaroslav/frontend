import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { ThemeMode } from './app.model';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    Init: emptyProps(),
    'Theme Mode Loaded': props<{ mode: ThemeMode }>(),
    'Toggle Theme Mode': emptyProps(),
  },
});