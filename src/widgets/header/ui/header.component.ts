import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { selectIsAuthenticated, selectUserInitial, SessionActions } from '@entities/session';
import { ThemeToggleComponent } from '@features/theme-toggle';
import { Store } from '@ngrx/store';
import { IconComponent } from '@shared/ui/icon';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { ButtonDirective } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { OverlayBadge } from 'primeng/overlaybadge';
import { Toolbar, ToolbarPassThrough } from 'primeng/toolbar';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ThemeToggleComponent,
    NgOptimizedImage,
    Toolbar,
    ButtonDirective,
    IconComponent,
    Avatar,
    Menu,
    OverlayBadge,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit{
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  
  protected readonly isAuthenticated = this.store.selectSignal(selectIsAuthenticated);
  
  readonly sidebarOpen = output<void>();

  protected openSidebar(): void {
    this.sidebarOpen.emit();
  }

  protected readonly headerPt: ToolbarPassThrough = {
    start: {
      class: 'flex-wrap',
    },
    end: {
      style: {
        gap: '20px'
      }
    }
  };

  protected readonly headerStyle = {
    borderRadius: '30px',
    padding: '0.75rem 1rem 0.75rem 1.5rem',
    border: 'none',
    backdropFilter: 'blur(0.5px) url(#lg-filter) blur(1px) saturate(1.5) brightness(1.1)',
    boxShadow: 'inset 0 0 12px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.2)',
  };
  
  protected readonly userInitial = this.store.selectSignal(selectUserInitial);
  
  protected items: MenuItem[] | undefined;
  
  ngOnInit(): void {
    this.items = [
      {
        label: 'Мой аккаунт',
        items: [
          { label: 'Профиль', icon: 'pi pi-user'},
          { label: 'Настройки', icon: 'pi pi-cog' },
          { 
            label: 'Выйти из аккаунта', 
            icon: 'pi pi-sign-out',
            command: () => this.logout()
          }
        ]
      },
      { separator: true},
      {
        label: 'Уведомления',
        items: [
          {label: 'Просмотр уведомлений', icon: 'pi pi-bell'}
        ]
      }
    ]
  }
  
  protected logout(): void {
    this.store.dispatch(SessionActions.logout());
    void this.router.navigateByUrl('/login');
  }
}
