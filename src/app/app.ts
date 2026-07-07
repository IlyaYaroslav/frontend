import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppActions } from '@app/store';
import { selectIsAuthenticated, SessionActions } from '@entities/session';
import { Store } from '@ngrx/store';
import { HeaderComponent } from '@widgets/header/ui/header.component';
import { SidebarComponent } from '@widgets/sidebar/ui/sidebar.component';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Toast, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly store = inject(Store);

  protected readonly title = signal('frontend');
  
  protected readonly sidebarVisible = signal(false);
  
  protected readonly isAuthenticated = this.store.selectSignal(selectIsAuthenticated);
  
  protected openSidebar(): void {
    this.sidebarVisible.set(true);
  }
  
  protected setSidebarVisible(value: boolean): void {
    this.sidebarVisible.set(value);
  }

  constructor() {
    this.store.dispatch(AppActions.init());
    this.store.dispatch(SessionActions.init());
  }
}
