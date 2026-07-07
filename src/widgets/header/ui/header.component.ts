import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { selectIsAuthenticated } from '@entities/session';
import { ThemeToggleComponent } from '@features/theme-toggle';
import { Store } from '@ngrx/store';
import { IconComponent } from '@shared/ui/icon';
import { Avatar } from 'primeng/avatar';
import { ButtonDirective } from 'primeng/button';
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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly store = inject(Store);
  
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
    borderRadius: '3rem',
    padding: '0.75rem 1rem 0.75rem 1.5rem',
    border: 'none',
    backdropFilter: 'blur(0.5px) url(#lg-filter) blur(1px) saturate(1.5) brightness(1.1)',
    boxShadow: 'inset 0 0 12px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.2)',
  };
}
