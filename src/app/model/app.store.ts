import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { AppState, ThemeMode } from './app.types';

const STORAGE_KEY = 'theme-mode';

function getInitialThemeMode(): ThemeMode {
  if (typeof localStorage === 'undefined') {
    return 'light';
  }

  return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
}



function applyThemeMode(mode: ThemeMode): void {
  if (typeof document === 'undefined') {
    return;
  }

  const root: HTMLElement = document.documentElement;

  root.dataset['mode'] = mode;
  root.style.colorScheme = mode;
}

function saveThemeMode(mode: ThemeMode): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, mode);
}

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>({
    themeMode: 'light',
  }),
  withComputed((store)=> ({
    isDarkTheme: computed(()=> store.themeMode() === 'dark')
  })),
  withMethods((store) => ({
    setThemeMode(mode: ThemeMode): void {
      patchState(store, { themeMode: mode });
      saveThemeMode(mode);
      applyThemeMode(mode);
    },
    toggleThemeMode(): void {
      const nextMode: ThemeMode = store.themeMode() === 'dark' ? 'light' : 'dark';

      patchState(store, { themeMode: nextMode });
      saveThemeMode(nextMode);
      applyThemeMode(nextMode);
    },
  })),
  withHooks({
    onInit(store) {
      const mode = getInitialThemeMode();

      patchState(store, { themeMode: mode });
      applyThemeMode(mode);
    },
  }),
);