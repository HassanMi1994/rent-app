import { Component } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
