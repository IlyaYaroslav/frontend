import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AUTH_API_URL } from '@shared/api/api.tokens';
import { Observable } from 'rxjs';
import type { LoginRequest, LoginResponse } from '../model/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionApi {
  private readonly http = inject(HttpClient);
  private readonly authApiUrl: string = inject(AUTH_API_URL);

  private get loginUrl(): string {
    return `${ this.authApiUrl }/login`;
  }
  
  private get registerUrl(): string {
    return `${ this.authApiUrl }/register`;
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${ this.loginUrl }`, payload);
  }
  
  register() {
    
  }
}