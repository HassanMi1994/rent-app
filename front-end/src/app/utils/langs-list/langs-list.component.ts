import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-langs-list',
  standalone: true,
  imports: [],
  templateUrl: './langs-list.component.html',
  styleUrl: './langs-list.component.scss'
})
export class LangsListComponent {

  constructor(private router: Router) { }


  
  changeLang(language: string) {
    var langManager = inject(TranslocoService);
    var oldLang=langManager.getActiveLang();
    langManager.setActiveLang(language);
    this.router.url.replace(oldLang, language);
  }

}
