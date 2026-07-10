import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { InputStringComponent } from '@shared/ui/input-string';
import { ButtonDirective } from 'primeng/button';
import type { ChangePasswordFormModel } from '../model/change-password.model';

@Component({
  selector: 'app-change-password-form',
  imports: [
    InputStringComponent,
    ButtonDirective,
  ],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordFormComponent {
  protected readonly model = signal<ChangePasswordFormModel>({
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  
  protected readonly changePasswordForm = form(this.model, (path) => {})
}
