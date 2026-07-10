export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface LoginResponseModel {
  accessToken: string;
}

export interface RegisterRequestModel {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseModel {
  token: string;
}