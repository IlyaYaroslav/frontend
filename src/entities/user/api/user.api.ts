import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { USER_API_URL } from '@shared/api/api.tokens';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly http = inject(HttpClient);
  private readonly userApiUrl = inject(USER_API_URL);

  getCurrentUserInfo(userId: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${ this.userApiUrl }/${ userId }`);
  }
}
