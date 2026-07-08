export interface UserModel {
  id: string;
  email: string;
  role: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
}

export type UpdateUserProfileRequest = Partial<Pick<UserModel, 'firstName' | 'lastName'>>;

export type UpdateUserProfileResponse = Pick<UserModel, 'id'> & Partial<Pick<UserModel, 'firstName' | 'lastName'>>;

export type UpdateUserAvatarResponse = Pick<UserModel, 'id' | 'avatarUrl'>;