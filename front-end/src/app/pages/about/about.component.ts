import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.titleService.setTitle('About Us - RSapp.ir');;
    this.metaService.updateTag({ name: 'description', content: 'Learn more about RSApp, our mission, and our team. | RSapp.ir' });
  }
}
