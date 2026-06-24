import { createSelector } from '@ngrx/store';
import { appFeature } from './app.reducer';

export const {
  selectSettings,
} = appFeature;

export const selectThemeMode = createSelector(
  selectSettings,
  (settings) => settings.themeMode,
);

export const selectIsDarkTheme = createSelector(
  selectThemeMode,
  (themeMode) => themeMode === 'dark',
);