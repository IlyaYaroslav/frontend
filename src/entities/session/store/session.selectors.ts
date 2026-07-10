import { createSelector } from '@ngrx/store';
import { decodeAccessToken } from '../lib/decode-access-token';
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

export const selectAccessTokenPayload = createSelector(
  selectAccessToken,
  (accessToken) => accessToken ? decodeAccessToken(accessToken) : null,
);

export const selectUserId = createSelector(
  selectAccessTokenPayload,
  (payload) => payload?.sub ?? null,
);

export const selectLoginLoading = createSelector(
  selectSessionState,
  (state) => state.loginLoading,
);

export const selectRegisterLoading = createSelector(
  selectSessionState,
  (state) => state.registerLoading,
);