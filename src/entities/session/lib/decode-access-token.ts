import { jwtDecode } from 'jwt-decode';

export interface AccessTokenPayload  {
  sub: string;
  iat: number;
  exp: number;
}

export function decodeAccessToken(token: string): AccessTokenPayload | null {
  try {
    return jwtDecode<AccessTokenPayload>(token);
  } catch {
    return null;
  }
}