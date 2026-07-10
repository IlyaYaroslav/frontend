import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { ChangePasswordFormModel } from '@features/change-password';
import { InputStringComponent } from '@shared/ui/input-string/ui/input-string.component';
import { ButtonDirective } from 'primeng/button';

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
  
  protected readonly changePasswordForm = form(this.model, (path) => {
    
  })
}
