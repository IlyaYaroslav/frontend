import { Component, signal } from '@angular/core';
import { email, form, required, submit } from '@angular/forms/signals'
import { LoginFormModel } from '@features/login-form/model/login-form.model'
import { InputStringComponent } from '@shared/ui/input-string/ui/input-string.component'

@Component({
  selector: 'app-login-form',
  imports: [
    InputStringComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  readonly submitted = signal(false);

  protected readonly model = signal<LoginFormModel>({
    email: '',
    password: '',
  });

  protected readonly loginForm = form(this.model, (path) => {
    required(path.email, { message: 'Введите email' });
    email(path.email, { message: 'Введите корректный email' });

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
        console.log('login payload', field().value());
        
        return;
      }
    })
  }
}
