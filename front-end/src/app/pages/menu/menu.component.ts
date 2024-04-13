import { DOCUMENT, Location } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TranslocoPipe, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterViewInit {
  isDarkMode: boolean;
  selectedLang: string;
  constructor(public transLoco: TranslocoService, @Inject(DOCUMENT) document: Document, private location: Location) {
    this.selectedLang = this.transLoco.getDefaultLang().toUpperCase();
  }
  ngAfterViewInit(): void {
    if (localStorage != undefined) {
      let langHistory = localStorage.getItem('selectedLang');
      if (langHistory !== undefined) {
        this.selectedLang = langHistory!.toUpperCase();
        this.transLoco.setActiveLang(langHistory!);
      }
    }
  }

  changeLang(lang: string) {
    let oldLang = this.transLoco.getActiveLang();
    let olaPath = document.location.pathname;
    let newRoute = olaPath.replace(`/${oldLang}/`, `/${lang}/`);
    this.location.replaceState(newRoute);
    localStorage.setItem('selectedLang', lang);
    this.selectedLang = lang.toUpperCase();
    this.transLoco.setActiveLang(lang);
  }

  toggleDarkMode() {
    let dark = document.querySelector('html')?.getAttribute('data-bs-theme');
    if (dark == 'dark') {
      document.querySelector('html')?.setAttribute('data-bs-theme', '');
      this.isDarkMode = false;
    }
    else {
      document.querySelector('html')?.setAttribute('data-bs-theme', 'dark');
      this.isDarkMode = true;
    }
  }

}
