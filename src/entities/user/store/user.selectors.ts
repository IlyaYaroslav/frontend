import { createSelector } from '@ngrx/store';
import { userFeature } from '../store/user.reducers';

export const {
  selectCurrentUser,
} = userFeature;

export const selectUserName = createSelector(
  selectCurrentUser,
  (user) => user?.firstName ?? null,
);

export const selectUserLabel = createSelector(
  selectUserName,
  (userName) => userName?.charAt(0).toUpperCase() ?? null,
);