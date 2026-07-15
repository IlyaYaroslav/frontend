import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { USERS_API_URL } from '@shared/api/api.tokens';
import { Observable } from 'rxjs';
import {
  UpdateUserPasswordRequest,
  UpdateUserPasswordResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  UploadUserAvatarRequest,
  UploadUserAvatarResponse,
  UserModel,
} from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly http = inject(HttpClient);
  private readonly userApiUrl = inject(USERS_API_URL);

  getCurrentUserInfo(userId: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.userApiUrl, {
      params: { id: userId },
    });
  }

  updateUserName(userId: string, payload: UpdateUserProfileRequest): Observable<UpdateUserProfileResponse> {
    return this.http.patch<UpdateUserProfileResponse>(`${ this.userApiUrl }/${ userId }/name`, payload);
  }

  updateUserPassword(userId: string, payload: UpdateUserPasswordRequest): Observable<UpdateUserPasswordResponse> {
    return this.http.patch<UpdateUserPasswordResponse>(`${ this.userApiUrl }/${ userId }/password`, payload);
  }

  uploadUserAvatar({id, file}: UploadUserAvatarRequest): Observable<UploadUserAvatarResponse> {
    return this.http.put<UploadUserAvatarResponse>(`${ this.userApiUrl }/${ id }/profile-picture`, file);
  }

  deleteUserAvatar(userId: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${ this.userApiUrl }/${ userId }/profile-picture`, {
      observe: 'response',
    });
  }
}
