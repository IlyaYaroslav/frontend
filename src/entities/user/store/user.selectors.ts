import { createSelector } from '@ngrx/store';
import { userFeature } from '../store/user.reducers';

export const {
  selectCurrentUser,
  selectUserState
} = userFeature;

export const selectUserName = createSelector(
  selectCurrentUser,
  (user) => user?.firstName,
);

export const selectUserLabel = createSelector(
  selectUserName,
  (userName) => userName?.charAt(0).toUpperCase() ?? null,
);

export const selectUserData = createSelector(
  selectCurrentUser,
  (user) => user
)

export const selectUserDataLoading = createSelector(
  selectUserState,
  (userState) => userState.loading
)
