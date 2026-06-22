import { createFeature, createReducer, on } from '@ngrx/store';
import { AppActions } from './app.actions';
import { AppState } from './app.model';

export const appFeatureKey = 'app';

const initialState: AppState = {
  settings: {
    themeMode: 'light',
  }
};

export const appFeature = createFeature({
  name: appFeatureKey,
  reducer: createReducer(
    initialState,

    on(AppActions.themeModeLoaded, (state, { mode }) => ({
      ...state,
      settings: {
        ...state.settings,
        themeMode: mode
      }
    })),

    on(AppActions.toggleThemeMode, (state) => ({
      ...state,
      settings: {
        ...state.settings,
        themeMode: state.settings.themeMode === 'dark' ? 'light' : 'dark',
      }
    })),
  ),
});