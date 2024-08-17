import { AfterViewInit, Component, Inject, OnInit, ViewChild, importProvidersFrom, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { slideInAnimation } from './animations';
import { CommonModule, Location, DOCUMENT } from '@angular/common';
import { MenuComponent } from './pages/menu/menu.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PopUpComponent } from './utils/pop-up/pop-up.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslocoPipe,
    CommonModule,
    MenuComponent,
    PopUpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'rent-front';

  constructor(
    public transLoco: TranslocoService,
    private contexts: ChildrenOutletContexts,
    private location: Location,
    @Inject(DOCUMENT) private document: Document) {

  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}