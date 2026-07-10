import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, minLength, pattern, required } from '@angular/forms/signals';
import { UserApi } from '@entities/user';
import { NAME_PATTERN } from '@shared/regex';
import { InputStringComponent } from '@shared/ui/input-string';
import { MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import type { UpdateProfileFormModel } from '../model/update-profile-form.model';

@Component({
  selector: 'app-update-profile-form',
  imports: [
    InputStringComponent,
    ButtonDirective,
  ],
  templateUrl: './update-profile-form.component.html',
  styleUrl: './update-profile-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProfileFormComponent {
  private readonly userApi = inject(UserApi);
  private readonly messageService = inject(MessageService);

  protected readonly submitted = signal(false);

  protected readonly model = signal<UpdateProfileFormModel>({
    firstName: 'Илья',
    lastName: '',
  });

  protected readonly updateProfileForm = form(this.model, (path) => {
    required(path.firstName, { message: 'Введите имя' });
    minLength(path.firstName, 2, { message: 'Имя должно быть не короче 2 символов' });
    pattern(path.firstName, NAME_PATTERN, { message: 'Имя должно содержать только буквы, пробел, дефис или апостроф' });
    
    pattern(path.lastName, NAME_PATTERN, {message: 'Фамилия должна содержать только буквы, пробел, дефис или апостроф'})
  });
}
