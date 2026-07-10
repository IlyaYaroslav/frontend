import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChangePasswordFormComponent } from '@features/change-password';
import { UpdateAvatarComponent } from '@features/update-avatar';
import { UpdateProfileFormComponent } from '@features/update-profile';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-profile-page',
  imports: [
    Divider,
    UpdateAvatarComponent,
    UpdateProfileFormComponent,
    ChangePasswordFormComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {}
