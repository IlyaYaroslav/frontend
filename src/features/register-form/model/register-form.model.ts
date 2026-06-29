export interface RegisterFormModel {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserRegisterRequestModel {
  name: string;
  email: string;
  password: string;
}

export interface UserRegisterResponseModel {
  accessToken: string;
}