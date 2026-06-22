export type ThemeMode = 'light' | 'dark';

export interface AppState {
  settings: AppSettings;
}

export interface AppSettings {
  themeMode: ThemeMode;
}