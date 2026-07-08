import { userFeature } from '@entities/user';
import { createSelector } from '@ngrx/store';

export const {
  selectAvatarUploading,
  selectCurrentUser,
  selectError,
  selectLoading,
  selectUpdating,
  selectUserState,
} = userFeature;

export const selectUserName = createSelector(
  selectCurrentUser,
  (user) => user?.firstName ?? null,
);

export const selectUserLabel = createSelector(
  selectUserName,
  (userName) => userName?.charAt(0).toUpperCase() ?? null,
);