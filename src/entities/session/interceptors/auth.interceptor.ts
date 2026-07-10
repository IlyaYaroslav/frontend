import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, switchMap, take, throwError } from 'rxjs';
import { SessionActions } from '../store/session.actions';
import { selectAuthorizationHeader } from '../store/session.selectors';

const PUBLIC_AUTH_URL_PARTS = ['/login', '/register'];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly store = inject(Store);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isPublicRequest(req.url)) {
      return next.handle(req);
    }

    return this.store.select(selectAuthorizationHeader).pipe(
      take(1),
      switchMap((authorizationHeader) => {
        const request = authorizationHeader ? req.clone({
          setHeaders: {
            Authorization: authorizationHeader,
          },
        }) : req;

        return next.handle(request).pipe(
          catchError((error: unknown) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              this.store.dispatch(SessionActions.logout());
            }

            return throwError(() => error);
          }),
        );
      }),
    );
  }

  private isPublicRequest(url: string): boolean {
    return PUBLIC_AUTH_URL_PARTS.some((urlPart: string) => url.includes(urlPart));
  }
}