import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppActions } from '@app/store';
import { SessionActions } from '@entities/session';
import { Store } from '@ngrx/store';
import { HeaderComponent } from '@widgets/header/ui/header.component';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly store = inject(Store);

  protected readonly title = signal('frontend');

  constructor() {
    this.store.dispatch(AppActions.init());
    this.store.dispatch(SessionActions.init());
  }
}
