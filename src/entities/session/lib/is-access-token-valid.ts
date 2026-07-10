import { type AccessTokenPayload, decodeAccessToken } from './decode-access-token';

export function isAccessTokenValid(accessToken: string | null): accessToken is string {
  if (!accessToken) {
    return false;
  }
  
  const payload: AccessTokenPayload | null = decodeAccessToken(accessToken);
  
  if (!payload?.exp) {
    return false;
  }
  
  const nowInSeconds = Math.floor(Date.now() / 1000);
  
  return payload.exp > nowInSeconds;
}