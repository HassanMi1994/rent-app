import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslocoPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rent-front';
  transLoco: TranslocoService;

  constructor(transLang: TranslocoService) {
    this.transLoco = transLang;
  }

  changeLang(lang: string) {
    this.transLoco.setActiveLang(lang);
  }
}
