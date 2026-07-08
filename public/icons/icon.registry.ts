import {
  LucideEye,
  LucideEyeOff,
  LucideFolderOpen,
  LucideLoader,
  LucideMenu,
  LucideMoon,
  LucidePen,
  LucideSquareCheckBig,
  LucideSun,
  LucideTrash2,
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
  'check-square': LucideSquareCheckBig,
  pen: LucidePen,
  trash: LucideTrash2
  
} as const;