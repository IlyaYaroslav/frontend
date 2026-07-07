import {
  LucideEye,
  LucideEyeOff,
  LucideLoader,
  LucideMoon,
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
  loader: LucideLoader
} as const;