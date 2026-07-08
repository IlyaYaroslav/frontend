import { Routes } from '@angular/router';
import { authGuard, guestGuard, startRedirect } from '@entities/session';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: startRedirect,
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('@pages/auth').then((m) => m.AuthPageComponent),
    data: { mode: 'login' },
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('@pages/auth').then((m) => m.AuthPageComponent),
    data: { mode: 'register' },
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadComponent: () => import('@pages/tasks').then((m) => m.TasksPageComponent),
  },
  {
    path: 'projects',
    canActivate: [authGuard],
    loadComponent: () => import('@pages/projects').then((m) => m.ProjectsPageComponent),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('@pages/profile').then((m) => m.ProfilePageComponent),
  },
];