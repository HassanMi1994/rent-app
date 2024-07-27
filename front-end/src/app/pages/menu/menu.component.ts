import { DOCUMENT, Location } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { UserManagerService } from '../../services/user-manager.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TranslocoPipe, RouterLink, MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterViewInit {
  isDarkMode: boolean;
  selectedLang: string;
  ls: Storage | undefined;
  items: MenuItem[5];
  @ViewChild('mySpan') span: HTMLSpanElement;

  constructor(public transLoco: TranslocoService, @Inject(DOCUMENT) document: Document, private location: Location, public userManager: UserManagerService) {
    this.selectedLang = this.transLoco.getDefaultLang().toUpperCase();
    this.ls = document.defaultView?.localStorage;

  }

  ngAfterViewInit(): void {
    if (this.ls) {
      let langHistory = this.ls.getItem('selectedLang');
      if (langHistory !== undefined) {
        this.selectedLang = langHistory!.toUpperCase();
        this.transLoco.setActiveLang(langHistory!);
      }
    }
    this.onResize(null);
  }

  changeLang(lang: string) {
    let oldLang = this.transLoco.getActiveLang();
    let olaPath = document.location.pathname;
    let newRoute = olaPath.replace(`/${oldLang}/`, `/${lang}/`);
    this.location.replaceState(newRoute);
    if (this.ls) {
      this.ls.setItem('selectedLang', lang);
    }
    this.selectedLang = lang.toUpperCase();
    this.transLoco.setActiveLang(lang);
  }


  openNav() {
    (document.getElementsByClassName('overlay')[0] as HTMLDivElement).style.width = "100%";
  }

  closeNav() {
    (document.getElementsByClassName('overlay')[0] as HTMLDivElement).style.width = "0%"
  }

  public innerWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 800) {
      (document.getElementsByClassName('sidebar-menu')[0] as HTMLDivElement).style.display = "block";
      (document.getElementsByClassName('normal-menu')[0] as HTMLDivElement).style.display = "none";
    } else {
      (document.getElementsByClassName('sidebar-menu')[0] as HTMLDivElement).style.display = "none";
      (document.getElementsByClassName('normal-menu')[0] as HTMLDivElement).style.display = "block";

    }
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
