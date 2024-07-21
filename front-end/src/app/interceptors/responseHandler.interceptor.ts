import { HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, tap } from 'rxjs';

export function responseHandlerInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let toast = inject(ToastrService);
  let translate = inject(TranslocoService);




  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.ResponseHeader) {
      //   toast.info(translate.translate(`resp.${event.status}`), undefined, { timeOut: 1000, extendedTimeOut: 1000 });  
      // console.log(req.url, 'returned a response with status', event.status);
    }
  }));
}