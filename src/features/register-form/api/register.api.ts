import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AUTH_API_URL } from '@shared/api/api.tokens';
import { Observable } from 'rxjs';
import { UserRegisterRequestModel, UserRegisterResponseModel } from './register.contracts';

@Injectable({
  providedIn: 'root',
})
export class RegisterApi {
  private readonly authApiUrl = inject(AUTH_API_URL);
  private readonly http = inject(HttpClient);
  
  private get registerUrl(): string {
    return `${this.authApiUrl}/register`;
  }

  register(payload: UserRegisterRequestModel): Observable<UserRegisterResponseModel> {
    return this.http.post<UserRegisterResponseModel>(`${this.registerUrl}`, payload);
  }
}
