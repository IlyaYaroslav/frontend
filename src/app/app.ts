import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppActions, selectIsDarkTheme } from '@app/store';
import { selectIsAuthenticated, SessionActions } from '@entities/session';
import { Store } from '@ngrx/store';
import { HeaderComponent } from '@widgets/header';
import { SidebarComponent } from '@widgets/sidebar';
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
  protected readonly isDarkTheme = this.store.selectSignal(selectIsDarkTheme);

  constructor() {
    this.store.dispatch(AppActions.init());
    this.store.dispatch(SessionActions.init());
  }

  protected openSidebar(): void {
    this.sidebarVisible.set(true);
  }

  protected setSidebarVisible(value: boolean): void {
    this.sidebarVisible.set(value);
  }
  
  protected toggleTheme(): void {
    this.store.dispatch(AppActions.toggleThemeMode());
  }
}
