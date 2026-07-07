import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoginFormComponent } from '@features/login-form';
import { RegisterFormComponent } from '@features/register-form';
import { AuthLayoutComponent } from '@widgets/auth-layout/ui/auth-layout.component';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { map } from 'rxjs';
import { AuthMode } from '../model/auth.model';

@Component({
  selector: 'app-auth-page',
  imports: [
    AuthLayoutComponent,
    Tab,
    TabList,
    Tabs,
    LoginFormComponent,
    RegisterFormComponent,
    RouterLink,
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
    ), { initialValue: 'register' as AuthMode },
  );

  protected readonly mode = computed<AuthMode>(() => this.routeMode() ?? 'login');
}
