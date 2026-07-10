import { ChangeDetectionStrategy, Component, input, output, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '@shared/ui/icon';
import { ButtonDirective } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { Drawer, DrawerPassThrough } from 'primeng/drawer';
import type { SidebarMenuItem } from '../model/sidebar.model';

@Component({
  selector: 'app-sidebar',
  imports: [
    ButtonDirective,
    Drawer,
    RouterLink,
    IconComponent,
    Divider,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly visible = input.required<boolean>();
  readonly visibleChange = output<boolean>();

  private readonly sidebarRef = viewChild.required<Drawer>('sidebarRef');

  protected readonly sidebarPt: DrawerPassThrough = {
    root: {
      style: {
        border: 'none',
        boxShadow: 'inset 0 0 12px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(0.5px) url(#lg-filter) blur(1px) saturate(1.5) brightness(1.1)',
        borderRadius: '0 20px 20px 0',
      },
    },
  };

  protected readonly menuItems: SidebarMenuItem[] = [
    {
      label: 'Задачи',
      route: '/tasks',
      icon: 'check-square',
    },
    {
      label: 'Проекты',
      route: '/projects',
      icon: 'folder-open',
    },
  ];

  protected closeCallback(event: PointerEvent): void {
    this.sidebarRef().close(event);
  }

  protected onVisibleChange(value: boolean): void {
    this.visibleChange.emit(value);
  }

  protected closeByNavigation(): void {
    this.visibleChange.emit(false);
  }

  protected readonly close = close;
}
