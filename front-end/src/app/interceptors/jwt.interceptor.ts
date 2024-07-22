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
    return next(cloned);
  } else {
    return next(req);
  }
};