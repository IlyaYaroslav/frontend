import { Component, inject, signal } from '@angular/core';
import { email, form, required, submit } from '@angular/forms/signals';
import { selectLoginLoading, SessionActions } from '@entities/session';
import { Store } from '@ngrx/store';
import { IconComponent } from '@shared/ui/icon';
import { InputStringComponent } from '@shared/ui/input-string';
import { ButtonDirective } from 'primeng/button';
import type { LoginFormModel } from '../model/login-form.model';

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
  private readonly store = inject(Store);

  readonly submitted = signal(false);

  protected readonly loading = this.store.selectSignal(selectLoginLoading);
  
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
        this.store.dispatch(SessionActions.login({ payload: field().value() }));
      },
    });
  }
}
