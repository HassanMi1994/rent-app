import { AfterViewInit, Component, OnInit, importProvidersFrom, inject } from '@angular/core';

import { ChildrenOutletContexts, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { slideInAnimation } from './animations';
import { CommonModule } from '@angular/common';
import { NgxPiwikProModule } from '@piwikpro/ngx-piwik-pro';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslocoPipe,
    CommonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation]
})
export class AppComponent implements AfterViewInit {
  title = 'rent-front';
  transLoco: TranslocoService;
  selectedLang: string;

  constructor(transLang: TranslocoService, private contexts: ChildrenOutletContexts) {
    this.transLoco = transLang;
    this.selectedLang = this.transLoco.getDefaultLang().toUpperCase();

  }
  ngAfterViewInit(): void {
    let langHistory = localStorage.getItem('selectedLang');
    if (langHistory !== undefined) {
      this.selectedLang = langHistory!.toUpperCase();
      this.transLoco.setActiveLang(langHistory!);
    }
  }

  changeLang(lang: string) {

    localStorage.setItem('selectedLang', lang);
    this.selectedLang = lang.toUpperCase();
    this.transLoco.setActiveLang(lang);
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}