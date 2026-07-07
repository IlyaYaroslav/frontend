import {
  LucideEye,
  LucideEyeOff,
  LucideFolderOpen,
  LucideLoader,
  LucideMenu,
  LucideMoon,
  LucideSquareCheckBig,
  LucideSun,
  LucideUserRound,
  LucideX,
} from '@lucide/angular';

export const iconRegistry = {
  moon: LucideMoon,
  sun: LucideSun,
  user: LucideUserRound,
  show: LucideEye,
  hide: LucideEyeOff,
  close: LucideX,
  loader: LucideLoader,
  menu: LucideMenu,
  'folder-open': LucideFolderOpen,
  'check-square': LucideSquareCheckBig
  
} as const;