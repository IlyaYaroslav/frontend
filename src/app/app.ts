import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppActions } from '@app/store';
import { Store } from '@ngrx/store';
import { HeaderComponent } from '@widgets/header/ui/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly store = inject(Store);
  
  protected readonly title = signal('frontend');
  
  constructor() {
    this.store.dispatch(AppActions.init());
  }
}
