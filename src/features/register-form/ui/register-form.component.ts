import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, minLength, pattern, required, submit, validate } from '@angular/forms/signals';
import { RegisterApi, UserRegisterResponseModel } from '@features/register-form';
import { NAME_PATTERN, PASSWORD_PATTERN } from '@shared/regex';
import { InputStringComponent } from '@shared/ui/input-string/ui/input-string.component';
import { firstValueFrom } from 'rxjs';
import { RegisterFormModel } from '../model/register-form.model';

@Component({
  selector: 'app-register-form',
  imports: [
    InputStringComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  private readonly registerApi = inject(RegisterApi);

  readonly submitted = signal(false);

  protected readonly model = signal<RegisterFormModel>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  protected readonly registerForm = form(this.model, (path) => {
    required(path.name, { message: 'Введите имя' });
    minLength(path.name, 2, { message: 'Имя должно быть не короче 2 символов' });
    pattern(path.name, NAME_PATTERN, {
      message: 'Имя должно содержать только буквы, пробел, дефис или апостроф',
    });

    required(path.email, { message: 'Введите email' });
    email(path.email, { message: 'Введите корректный email: example@mail.com' });

    required(path.password, { message: 'Введите пароль' });
    minLength(path.password, 8, { message: 'Пароль должен быть не короче 8 символов' });
    pattern(path.password, PASSWORD_PATTERN, { message: 'Пароль должен содержать заглавную букву, строчную букву, цифру' });

    required(path.confirmPassword, { message: 'Повторите пароль' });

    validate(path.confirmPassword, ({ value, valueOf }) => {
      return value() === valueOf(path.password) ? undefined : {
        kind: 'passwordMismatch',
        message: 'Пароли не совпадают',
      };
    });
  });

  async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    this.submitted.set(true);

    await submit(this.registerForm, {
      onInvalid: (field) => {
        field().focusBoundControl();
      },
      action: async (field) => {
        const { confirmPassword, ...payload } = field().value();

        const response: UserRegisterResponseModel = await firstValueFrom(this.registerApi.register(payload));

        return;
      },
    });
  }
}
