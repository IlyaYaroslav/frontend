import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '@shared/ui/icon';
import { ToggleSwitch, ToggleSwitchPassThrough } from 'primeng/toggleswitch';

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
  readonly isDarkTheme = input.required<boolean>();
  readonly themeToggled = output<void>();
  
  protected toggleTheme(): void {
    this.themeToggled.emit();
  }
  
  protected readonly togglePt: ToggleSwitchPassThrough | undefined = {
    input: {
      class: 'theme-toggle-switch__input',
    },
    slider: {
      class: 'theme-toggle-switch__slider',
    },
    handle: {
      class: 'theme-toggle-switch__handle',
    },
  }
}
