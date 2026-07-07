export interface UserRegisterRequestModel {
  name: string;
  email: string;
  password: string;
}

export interface UserRegisterResponseModel {
  token: string;
}