import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppActions, selectIsDarkTheme } from '@app/store';
import { Store } from '@ngrx/store';
import { IconComponent } from '@shared/ui/icon';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
  selector: 'app-theme-toggle',
  imports: [
    ToggleSwitch,
    FormsModule,
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
