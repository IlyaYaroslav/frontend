import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppActions, selectIsDarkTheme } from '@app/store';
import { Store } from '@ngrx/store';
import { IconComponent } from '@shared/ui/icon';

@Component({
  selector: 'app-theme-toggle',
  imports: [
    IconComponent,
  ],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  private readonly store = inject(Store);

  protected readonly isDarkTheme = this.store.selectSignal(selectIsDarkTheme);

  protected toggleTheme(): void {
    this.store.dispatch(AppActions.toggleThemeMode());
  }
}
