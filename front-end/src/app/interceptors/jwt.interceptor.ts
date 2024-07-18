import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserManagerService } from '../services/user-manager.service';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  

  const cookieService = inject(CookieService);
  const token = cookieService.get('jwt-token');
  const userService = inject(UserManagerService);

  console.log('interceptor is working fine!')
  if (token && token.length > 1) {
    userService.userInfo.isLoggedIn = true;//todo: save userinfo in local storage and load them after page is loaded ngOnInit!
    const cloned = req.clone({
      setHeaders: {
        authorization: token,
      },
      reportProgress: true,
    });

    console.warn('authorization set succussfly');

    return next(cloned);
  } else {
    return next(req);
  }
};

// @Injectable()
// export class HttpRequestInterceptor implements HttpInterceptor {
//   private isRefreshing = false;

//   constructor(
//     //private storageService: StorageService,
//     private authService: UserManagerService,
//   ) { }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     req.headers.append('authorization', 'bearer ' + this.authService.token)
//     throw new Error('Method not implemented.');
//   }

// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   req = req.clone({
//     withCredentials: true,
//   });

//   return next.handle(req).pipe(
//     catchError((error) => {
//       if (
//         error instanceof HttpErrorResponse &&
//         !req.url.includes('auth/signin') &&
//         error.status === 401
//       ) {
//         return this.handle401Error(req, next);
//       }

//       return throwError(() => error);
//     })
//   );
// }

// private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//   if (!this.isRefreshing) {
//     this.isRefreshing = true;

//     if (this.storageService.isLoggedIn()) {
//       return this.authService.refreshToken().pipe(
//         switchMap(() => {
//           this.isRefreshing = false;

//           return next.handle(request);
//         }),
//         catchError((error) => {
//           this.isRefreshing = false;

//           if (error.status == '403') {
//             this.eventBusService.emit(new EventData('logout', null));
//           }

//           return throwError(() => error);
//         })
//       );
//     }
//   }

//   return next.handle(request);
// }

