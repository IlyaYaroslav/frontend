import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLoginRequestModel, UserLoginResponseModel } from '@features/login-form/api/login.contracts';
import { AUTH_API_URL } from '@shared/api/api.tokens';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginApi {
  private readonly authApiUrl = inject(AUTH_API_URL);
  private readonly http = inject(HttpClient);

  private get loginUrl(): string {
    return `${ this.authApiUrl }/login`;
  }

  login(payload: UserLoginRequestModel): Observable<UserLoginResponseModel> {
    return this.http.post<UserLoginResponseModel>(`${ this.loginUrl }`, payload);
  }
}
