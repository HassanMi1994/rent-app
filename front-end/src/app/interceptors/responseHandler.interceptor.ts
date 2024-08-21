import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, tap, throwError } from 'rxjs';

export function responseHandlerInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let toast = inject(ToastrService);
  let translate = inject(TranslocoService);




  return next(req)
  .pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      toast.info(translate.translate(`resp.${event.status}`), undefined, { timeOut: 1000, extendedTimeOut: 1000 });
    }
    if (event.type === HttpEventType.ResponseHeader) {
      toast.info(translate.translate(`resp.${event.status}`), undefined, { timeOut: 1000, extendedTimeOut: 1000 });
    }
  }))
  .pipe(catchError((error: HttpErrorResponse) => {
      toast.error(translate.translate(`resp.${error.status}`), undefined, { timeOut: 3000, extendedTimeOut: 1000 });
      return throwError(error);
    }));
}