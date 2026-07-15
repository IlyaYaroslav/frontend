import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { selectUserData, UserActions } from '@entities/user';
import { ChangePasswordFormComponent } from '@features/change-password';
import { UpdateAvatarComponent } from '@features/update-avatar';
import { UpdateProfileFormComponent } from '@features/update-profile';
import { Store } from '@ngrx/store';
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
export class ProfilePageComponent {
  private readonly store = inject(Store);

  readonly userData = this.store.selectSignal(selectUserData);

  protected onUploadAvatar(file: File): void {
    this.store.dispatch(UserActions.uploadAvatar({ file }));
  }
  
  protected onDeleteAvatar(): void {
    this.store.dispatch(UserActions.deleteAvatar());
  }
}
