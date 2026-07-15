import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, minLength, pattern, required, submit, validate } from '@angular/forms/signals';
import { selectRegisterLoading, SessionActions } from '@entities/session';
import { Store } from '@ngrx/store';
import { NAME_PATTERN, PASSWORD_PATTERN } from '@shared/regex';
import { IconComponent } from '@shared/ui/icon';
import { InputStringComponent } from '@shared/ui/input-string';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import type { RegisterFormModel } from '../model/register-form.model';

@Component({
  selector: 'app-register-form',
  imports: [
    InputStringComponent,
    ButtonDirective,
    ButtonModule,
    IconComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  private readonly store = inject(Store);

  readonly submitted = signal(false);

  protected readonly loading = this.store.selectSignal(selectRegisterLoading);

  protected readonly model = signal<RegisterFormModel>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  protected readonly registerForm = form(this.model, (path) => {
    required(path.name, { message: 'Введите имя' });
    minLength(path.name, 1, { message: 'Имя должно быть не короче 1 символа' });
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
        const { name, password, email } = field().value();

        this.store.dispatch(SessionActions.register({
          payload: {
            name: name.trim(),
            email,
            password,
          },
        }));
      },
    });
  }
}
