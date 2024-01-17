import { Component, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-langs-list',
  standalone: true,
  imports: [],
  templateUrl: './langs-list.component.html',
  styleUrl: './langs-list.component.scss'
})
export class LangsListComponent {

  changeLang(language: string) {
    var langManager = inject(TranslocoService);
    langManager.setActiveLang(language);
  }

}
