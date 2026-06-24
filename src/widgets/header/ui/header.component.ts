import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '@features/theme-toggle';
import { HEADER_NAVIGATION, HeaderNavItem } from '../navigation/header.navigation';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ThemeToggleComponent,
    NgOptimizedImage,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  protected readonly headerNav: HeaderNavItem[] = HEADER_NAVIGATION;
}
