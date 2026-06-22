import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs';
import { AppActions } from './app.actions';
import { ThemeMode } from './app.model';
import { selectThemeMode } from './app.selectors';

const STORAGE_KEY = 'theme-mode';

function readThemeMode(): ThemeMode {
  return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
}

function applyThemeMode(mode: ThemeMode): void {
  document.documentElement.dataset['mode'] = mode;
  document.documentElement.style.colorScheme = mode;
}

@Injectable()
export class AppEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  readonly initThemeMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.init),
      map(() => AppActions.themeModeLoaded({ mode: readThemeMode() })),
    ));

  readonly syncThemeMode$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AppActions.themeModeLoaded, AppActions.toggleThemeMode),
        withLatestFrom(this.store.select(selectThemeMode)),
        tap(([, mode]) => {
          localStorage.setItem(STORAGE_KEY, mode);
          applyThemeMode(mode);
        }),
      ),
    { dispatch: false },
  );
}