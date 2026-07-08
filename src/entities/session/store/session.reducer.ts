import { createFeature, createReducer, on } from '@ngrx/store';
import { SessionActions } from './session.actions';

export const sessionFeatureKey = 'session';

export interface SessionState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: SessionState = {
  accessToken: null,
  isAuthenticated: false,
};

export const sessionFeature = createFeature({
  name: sessionFeatureKey,
  reducer: createReducer(
    initialState,

    on(SessionActions.tokenLoaded, (state, { accessToken }) => ({
      ...state,
      accessToken,
      isAuthenticated: Boolean(accessToken),
    })),

    on(SessionActions.loginSuccess, (state, { accessToken }) => ({
      ...state,
      accessToken,
      isAuthenticated: true,
    })),

    on(SessionActions.logout, () => initialState),
  ),
});
