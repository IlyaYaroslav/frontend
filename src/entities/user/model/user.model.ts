export interface UserModel {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string | null;
  profilePicturePresignedUrl: string | null;
}

export interface UpdateUserProfileRequest {
  newFirstName?: string;
  newLastName?: string;
}
export type UpdateUserProfileResponse = Pick<UserModel, 'id'> & Partial<Pick<UserModel, 'firstName' | 'lastName'>>;

export interface UpdateUserPasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export type UpdateUserPasswordResponse = Pick<UserModel, 'id'>;

export interface UploadUserAvatarRequest {
  id: string;
  file: File;
}
export type UploadUserAvatarResponse = Pick<UserModel, 'id' | 'profilePicturePresignedUrl'>;

export type UserRole = 'ADMIN' | 'USER';