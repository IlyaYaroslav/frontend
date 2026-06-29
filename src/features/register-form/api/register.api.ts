import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserRegisterRequestModel, UserRegisterResponseModel } from '@features/register-form';
import { USER_API_URL } from '@shared/api/api.tokens';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterApi {
  private readonly USER_URL = inject(USER_API_URL);
  private readonly http = inject(HttpClient);
  
  private get registerUrl(): string {
    return `${this.USER_URL}/register`;
  }

  register(payload: UserRegisterRequestModel): Observable<UserRegisterResponseModel> {
    return this.http.post<UserRegisterResponseModel>(`${this.registerUrl}`, payload);
  }
}