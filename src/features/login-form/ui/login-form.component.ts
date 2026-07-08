import { Component, inject, signal } from '@angular/core';
import { email, form, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { SessionActions } from '@entities/session';
import { LoginApi } from '@features/login-form/api/login.api';
import { UserLoginResponseModel } from '@features/login-form/api/login.contracts';
import { LoginFormModel } from '@features/login-form/model/login-form.model';
import { Store } from '@ngrx/store';
import { IconComponent } from '@shared/ui/icon';
import { InputStringComponent } from '@shared/ui/input-string/ui/input-string.component';
import { MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login-form',
  imports: [
    InputStringComponent,
    ButtonDirective,
    IconComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private readonly loginApi = inject(LoginApi);
  private readonly store = inject(Store);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly submitted = signal(false);

  protected readonly loading = signal<boolean>(false);

  protected readonly model = signal<LoginFormModel>({
    email: '',
    password: '',
  });

  protected readonly loginForm = form(this.model, (path) => {
    required(path.email, { message: 'Введите email' });
    email(path.email, { message: 'Введите корректный email: example@mail.com' });

    required(path.password, { message: 'Введите пароль' });
  });

  async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    this.submitted.set(true);

    await submit(this.loginForm, {
      onInvalid: (field) => {
        field().focusBoundControl();
      },
      action: async (field) => {

        const payload = field().value();

        this.loading.set(true);

        try {
          const { accessToken }: UserLoginResponseModel = await firstValueFrom(this.loginApi.login(payload));

          this.store.dispatch(SessionActions.loginSuccess({accessToken}));
          
          void this.router.navigateByUrl('/tasks');
          
          this.messageService.add({severity: 'success', summary: 'Успех', detail: 'Вы успешно вошли в аккаунт'});
          
        } catch (e) {
          this.messageService.add({severity: 'error', summary: 'Ошибка', detail: 'При входе произошла ошибка'})
        } finally {
          this.loading.set(false);
        }

        return;
      },
    });
  }
}
