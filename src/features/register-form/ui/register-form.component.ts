import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, minLength, pattern, required, submit, validate } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { RegisterApi } from '@features/register-form';
import { NAME_PATTERN, PASSWORD_PATTERN } from '@shared/regex';
import { IconComponent } from '@shared/ui/icon';
import { InputStringComponent } from '@shared/ui/input-string/ui/input-string.component';
import { MessageService } from 'primeng/api';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { firstValueFrom } from 'rxjs';
import { RegisterFormModel } from '../model/register-form.model';

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
  private readonly registerApi = inject(RegisterApi);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  readonly submitted = signal(false);

  protected readonly loading = signal<boolean>(false);

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
        const { confirmPassword, name, password, email } = field().value();

        this.loading.set(true);

        const normalizedPayload = {
          name: name.trim(),
          password,
          email,
        };

        try {
          await firstValueFrom(this.registerApi.register(normalizedPayload));

          this.messageService.add({ severity: 'success', summary: 'Успех', detail: 'Регистрация прошла успешно' });

          void this.router.navigateByUrl('/login');
        } catch (error: unknown) {
          if (error as HttpErrorResponse) {
            switch ((error as HttpErrorResponse).status) {
              case (409):
                this.messageService.add({
                  severity: 'error',
                  summary: 'Ошибка',
                  detail: 'Пользователь с данной почтой уже зарегистрирован',
                });
                break;

              default:
                break;
            }

            return;
          }


          this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'При регистрации произошла ошибка' });

        } finally {
          this.loading.set(false);
        }

        return;
      },
    });
  }
}
