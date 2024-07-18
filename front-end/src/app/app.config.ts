import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxPiwikProModule } from '@piwikpro/ngx-piwik-pro';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { provideToastr } from 'ngx-toastr';
import { responseHandlerInterceptor } from './interceptors/responseHandler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'fa', 'ch', 'ru', 'it', 'ka', 'fr', 'ar'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    provideToastr({
      closeButton: true,
      progressAnimation: 'increasing',
      progressBar: true,
      timeOut: 1000,
      positionClass: 'toast-bottom-center',
    }),
    provideAnimations(),
    // NgxPiwikProModule.forRoot('6d780b91-c761-41ab-b8f5-9928c2a0acd5', 'https://hassanmi1994.piwik.pro')
    // { provide: HTTP_INTERCEPTORS, useClass: ResponseHandlerInterceptor, multi: true },
    provideHttpClient(withInterceptors([jwtInterceptor, responseHandlerInterceptor])),
  ],

};
