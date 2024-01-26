import { Component, OnInit, inject } from '@angular/core';

import { ChildrenOutletContexts, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { slideInAnimation } from './animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslocoPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'rent-front';
  transLoco: TranslocoService;

  constructor(transLang: TranslocoService, private contexts: ChildrenOutletContexts) {
    this.transLoco = transLang;
  }

  changeLang(lang: string) {
    this.transLoco.setActiveLang(lang);
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}