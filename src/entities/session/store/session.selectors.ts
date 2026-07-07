import { createSelector } from '@ngrx/store';
import { sessionFeature } from './session.reducer';

export const {
  selectAccessToken,
  selectSessionState,
} = sessionFeature;

export const selectIsAuthenticated = createSelector(
  selectSessionState,
  (state) => state.isAuthenticated,
);

export const selectAuthorizationHeader = createSelector(
  selectAccessToken,
  (accessToken) => accessToken ? `Bearer ${ accessToken }` : null,
);

