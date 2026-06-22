import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { IconName } from '../model/icon.model';
import { iconRegistry } from '../model/icon.registry';

@Component({
  selector: 'app-icon',
  imports: [
    LucideDynamicIcon,
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input<number>(20);

  readonly icon = computed(() => iconRegistry[this.name()]);
}
