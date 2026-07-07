export interface UserLoginRequestModel {
  email: string;
  password: string;
}

export interface UserLoginResponseModel {
  accessToken: string;
}