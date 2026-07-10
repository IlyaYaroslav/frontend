import { inject } from '@angular/core';
import { CanActivateFn, RedirectFunction, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isAccessTokenValid } from '../lib/is-access-token-valid';
import { selectAccessToken } from '../store/session.selectors';

const ACCESS_TOKEN_KEY = 'access_token';

function getAccessToken(): string | null {
  const store = inject(Store);
  const tokenFromStore = store.selectSignal(selectAccessToken)();
  const accessToken = tokenFromStore ?? localStorage.getItem(ACCESS_TOKEN_KEY);

  return isAccessTokenValid(accessToken) ? accessToken : null;
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  return getAccessToken() ? true : router.createUrlTree(['/login']);
};

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);

  return getAccessToken() ? router.createUrlTree(['/tasks']) : true;
};

export const startRedirect: RedirectFunction = () => {
  return getAccessToken() ? '/tasks' : '/login';
};