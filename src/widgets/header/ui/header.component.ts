import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from '@features/theme-toggle';
import { IconComponent } from '@shared/ui/icon';
import { HEADER_NAVIGATION, HeaderNavItem } from '../navigation/header.navigation';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ThemeToggleComponent,
    IconComponent,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  protected readonly headerNav: HeaderNavItem[] = HEADER_NAVIGATION;
}
