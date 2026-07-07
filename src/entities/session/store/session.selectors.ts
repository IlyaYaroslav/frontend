import { createSelector } from '@ngrx/store';
import { sessionFeature } from './session.reducer';

export const {
  selectAccessToken,
} = sessionFeature;

export const selectAuthorizationHeader = createSelector(
  selectAccessToken,
  (accessToken) => accessToken ? `Bearer ${accessToken}` : null,
);
