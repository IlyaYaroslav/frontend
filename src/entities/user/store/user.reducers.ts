import { createFeature, createReducer, on } from '@ngrx/store';
import type { UserModel } from '../model/user.model';
import { UserActions } from '../store/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  currentUser: UserModel | null;
  loading: boolean;
  updating: boolean;
  avatarUploading: boolean;
  error: unknown | null;
}

export const initialUserState: UserState = {
  currentUser: null,
  loading: false,
  updating: false,
  avatarUploading: false,
  error: null,
};

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer: createReducer(
    initialUserState,

    on(UserActions.loadCurrentUser, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(UserActions.loadCurrentUserSuccess, (state, { user }) => ({
      ...state,
      currentUser: user,
      loading: false,
      error: null,
    })),

    on(UserActions.loadCurrentUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(UserActions.updateCurrentUser, (state) => ({
      ...state,
      updating: true,
      error: null,
    })),

    on(UserActions.updateCurrentUserSuccess, (state, { patch }) => ({
      ...state,
      currentUser: state.currentUser ? { ...state.currentUser, ...patch } : null,
      updating: false,
      error: null,
    })),

    on(UserActions.updateCurrentUserFailure, (state, { error }) => ({
      ...state,
      updating: false,
      error,
    })),

    on(UserActions.uploadAvatar, (state) => ({
      ...state,
      avatarUploading: true,
      error: null,
    })),

    on(UserActions.uploadAvatarSuccess, (state, { patch }) => ({
      ...state,
      currentUser: state.currentUser ? { ...state.currentUser, ...patch } : null,
      avatarUploading: false,
      error: null,
    })),

    on(UserActions.uploadAvatarFailure, (state, { error }) => ({
      ...state,
      avatarUploading: false,
      error,
    })),

    on(UserActions.deleteAvatar, (state) => ({
      ...state,
      avatarUploading: true,
      error: null,
    })),

    on(UserActions.deleteAvatarSuccess, (state) => ({
      ...state,
      currentUser: state.currentUser ? { ...state.currentUser, profilePicturePresignedUrl: null } : null,
      avatarUploading: false,
      error: null,
    })),

    on(UserActions.deleteAvatarFailure, (state, { error }) => ({
      ...state,
      avatarUploading: false,
      error,
    })),

    on(UserActions.clearCurrentUser, (state) => initialUserState),
  ),
});
