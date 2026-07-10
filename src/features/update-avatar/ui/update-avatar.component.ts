import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@shared/ui/icon';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-update-avatar',
  imports: [
    IconComponent,
    Button,
  ],
  templateUrl: './update-avatar.component.html',
  styleUrl: './update-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateAvatarComponent {
  protected avatarActionStyle = {
    width: '48px', 
    height: '48px', 
    padding: '0', 
    borderRadius: '50%',
  };
}
