import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginFormComponent } from '@features/login-form/ui/login-form.component';
import { RegisterFormComponent } from '@features/register-form';
import { AuthLayoutComponent } from '@widgets/auth-layout/ui/auth-layout.component';
import { map } from 'rxjs';
import { AuthMode } from '../model/auth.model';

@Component({
  selector: 'app-auth-page',
  imports: [
    RouterLink,
    RouterLinkActive,
    LoginFormComponent,
    RegisterFormComponent,
    AuthLayoutComponent,
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly routeMode = toSignal(
    this.route.data.pipe(
      map((data) => data['mode'] as AuthMode | undefined),
    ), { initialValue: 'login' as AuthMode },
  );

  protected readonly mode = computed<AuthMode>(() => this.routeMode() ?? 'login');
}
