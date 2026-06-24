import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@pages/auth').then((m) => m.AuthPageComponent),
    data: { mode: 'login' },
  },
  {
    path: 'register',
    loadComponent: () => import('@pages/auth').then((m) => m.AuthPageComponent),
    data: { mode: 'register' },
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];