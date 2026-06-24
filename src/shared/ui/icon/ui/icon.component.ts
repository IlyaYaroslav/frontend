import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { iconRegistry } from 'public/icons/icon.registry';
import { IconName } from '../model/icon.model';

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
