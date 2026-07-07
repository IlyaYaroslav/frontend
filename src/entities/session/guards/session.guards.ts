import { inject } from '@angular/core';
import { CanActivateFn, RedirectFunction, Router } from '@angular/router';
import { selectAccessToken } from '@entities/session';
import { Store } from '@ngrx/store';

const ACCESS_TOKEN_KEY = 'access_token';

function getAccessToken(): string | null {
  const store = inject(Store);
  const tokenFromStore = store.selectSignal(selectAccessToken)();
  
  return tokenFromStore ?? localStorage.getItem(ACCESS_TOKEN_KEY);
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  
  return getAccessToken() ? true : router.createUrlTree(['/login']);
};

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  
  return getAccessToken() ? router.createUrlTree(['/tasks']) : true;
}

export const startRedirect: RedirectFunction = () => {
  return getAccessToken() ? '/tasks' : '/login';
}