import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../pages/login').then((m) => m.LoginPageComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('../pages/register').then((m) => m.RegisterPageComponent),
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
];