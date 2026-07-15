import { ChangeDetectionStrategy, Component, computed, input, output, viewChild } from '@angular/core';
import { UserModel } from '@entities/user';
import { IconComponent, IconName } from '@shared/ui/icon';
import { InputFileComponent } from '@shared/ui/input-file/ui/input-file.component';
import { Button } from 'primeng/button';

interface ActionButtonModel {
  title: string;
  icon: IconName;
  action: ActionType;
}

type ActionType = 'edit' | 'delete';

@Component({
  selector: 'app-update-avatar',
  imports: [
    IconComponent,
    Button,
    InputFileComponent,
  ],
  templateUrl: './update-avatar.component.html',
  styleUrl: './update-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateAvatarComponent {
  readonly userData = input<UserModel | null>(null);
  
  readonly uploadAvatar = output<File>();
  readonly deleteAvatar = output<void>();

  protected readonly hasAvatar = computed(() => !!this.userData()?.profilePicturePresignedUrl);
  protected readonly userLabel = computed(() => {
    const user = this.userData();

    return `${ user?.firstName[0] ?? ''}${ user?.lastName?.[0] ?? '' }`;
  });
  protected readonly avatarUrl = computed(() => this.userData()?.profilePicturePresignedUrl);
  
  private readonly avatarFileInput = viewChild.required(InputFileComponent);

  protected avatarActionStyle = {
    width: '48px',
    height: '48px',
    padding: '0',
    borderRadius: '50%',
  };

  protected readonly actionButtons: ActionButtonModel[] = [
    {
      title: 'Редактировать фото',
      icon: 'pen',
      action: 'edit',
    },
    {
      title: 'Удалить фото',
      icon: 'trash',
      action: 'delete',
    },
  ];

  protected onActionButtonClick(action: ActionType): void {
    switch (action) {
      case 'edit':
        this.onUploadAvatar();
        break;
      case 'delete':
        this.onDeleteAvatar();
        break;
      default:
        break;
    }
  }
  
  protected onFileSelected(file: File): void {
    this.uploadAvatar.emit(file);
  }
  
  private onUploadAvatar(): void {
    this.avatarFileInput().open();
  }

  private onDeleteAvatar(): void {
    this.deleteAvatar.emit();
  }
}
