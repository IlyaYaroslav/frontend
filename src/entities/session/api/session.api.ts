import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AUTH_API_URL } from '@shared/api/api.tokens';
import { Observable } from 'rxjs';
import type {
  LoginRequestModel,
  LoginResponseModel,
  RegisterRequestModel,
  RegisterResponseModel,
} from '../model/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionApi {
  private readonly http = inject(HttpClient);
  private readonly authApiUrl: string = inject(AUTH_API_URL);

  login(payload: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${ this.authApiUrl }/login`, payload);
  }

  register(payload: RegisterRequestModel): Observable<RegisterResponseModel> {
    return this.http.post<RegisterResponseModel>(`${ this.authApiUrl }/register`, payload);
  }
}