import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxPiwikProModule } from '@piwikpro/ngx-piwik-pro';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()), provideClientHydration(), provideHttpClient(), provideTransloco({
    config: {
      availableLangs: ['en', 'fa', 'ch', 'ru', 'it','ka','fr','ar'],
      defaultLang: 'en',
      // Remove this option if your application doesn't support changing language in runtime.
      reRenderOnLangChange: true,
      prodMode: !isDevMode(),
    },
    loader: TranslocoHttpLoader
  }),
  provideAnimations(),
    // NgxPiwikProModule.forRoot('6d780b91-c761-41ab-b8f5-9928c2a0acd5', 'https://hassanmi1994.piwik.pro')
  ],

};
