import { createFeature, createReducer, on } from '@ngrx/store';
import { isAccessTokenValid } from '../lib/is-access-token-valid';
import { SessionActions } from './session.actions';

export const sessionFeatureKey = 'session';

export interface SessionState {
  accessToken: string | null;
  isAuthenticated: boolean;
  loginLoading: boolean;
  loginError: unknown | null;
  registerLoading: boolean;
  registerError: unknown | null;
}

const initialState: SessionState = {
  accessToken: null,
  isAuthenticated: false,
  loginLoading: false,
  loginError: null,
  registerLoading: false,
  registerError: null,
};

export const sessionFeature = createFeature({
  name: sessionFeatureKey,
  reducer: createReducer(
    initialState,

    on(SessionActions.tokenLoaded, (state, { accessToken }) => ({
      ...state,
      accessToken,
      isAuthenticated: isAccessTokenValid(accessToken),
    })),

    on(SessionActions.login, (state) => ({
      ...state,
      loginLoading: true,
      loginError: null,
    })),

    on(SessionActions.loginSuccess, (state, { accessToken }) => {
      const isAuthenticated: boolean = isAccessTokenValid(accessToken);

      return {
        ...state,
        accessToken: isAuthenticated ? accessToken : null,
        isAuthenticated,
        loginLoading: false,
        loginError: null,
      };
    }),

    on(SessionActions.loginFailure, (state, { error }) => ({
      ...state,
      accessToken: null,
      isAuthenticated: false,
      loginLoading: false,
      loginError: error,
    })),

    on(SessionActions.register, (state) => ({
      ...state,
      registerLoading: true,
      registerError: null,
    })),

    on(SessionActions.registerSuccess, (state, { accessToken }) => {
      const isAuthenticated: boolean = isAccessTokenValid(accessToken);

      return {
        ...state,
        accessToken: isAuthenticated ? accessToken : null,
        isAuthenticated,
        registerLoading: false,
        registerError: null,
      };
    }),

    on(SessionActions.registerFailure, (state, { error }) => ({
      ...state,
      registerLoading: false,
      registerError: error,
    })),

    on(SessionActions.logout, () => initialState),
  ),
});
