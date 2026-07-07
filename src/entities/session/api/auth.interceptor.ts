import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
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
        if (this.isPublicRequest(req.url)) {
          return next.handle(req);
        }

        if (!authorizationHeader) {
          return next.handle(req);
        }

        const authorizationRequest = req.clone({
          setHeaders: {
            Authorization: authorizationHeader,
          },
        });

        return next.handle(authorizationRequest);
      }),
    );
  }
  
  private isPublicRequest(url: string): boolean {
    return PUBLIC_AUTH_URL_PARTS.some((urlPart: string) => url.includes(urlPart));
  }
}