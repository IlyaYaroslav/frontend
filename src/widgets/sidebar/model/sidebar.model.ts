import { IconName } from '@shared/ui/icon/model/icon.model';

export interface SidebarMenuItem {
  label: string;
  route: string;
  icon: IconName;
}