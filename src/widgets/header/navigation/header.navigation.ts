export interface HeaderNavItem {
  label: string;
  routerLink: string;
}


export const HEADER_NAVIGATION: HeaderNavItem[] = [
  {
    label: 'Задачи',
    routerLink: '/tasks'
  }
]