import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppStore } from '@app/model/app.store';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  private readonly appStore = inject(AppStore);
}
