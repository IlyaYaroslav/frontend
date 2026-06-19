import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFormComponent } from '@features/auth/ui/auth-form.component';
import { AuthLayoutComponent } from '@widgets/auth-layout/ui/auth-layout.component';

@Component({
  selector: 'app-login-page',
  imports: [
    AuthFormComponent,
    AuthLayoutComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

}
