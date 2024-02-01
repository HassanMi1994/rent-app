import { Component, OnInit } from '@angular/core';
import { Stuff } from '../../models/stuff';
import { StuffService } from '../../services/stuff.service';
import { CreateStuffComponent } from './create-stuff/create-stuff.component';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-stuff',
  standalone: true,
  imports: [CreateStuffComponent, RouterLink, TranslocoPipe],
  templateUrl: './stuff.component.html',
  styleUrl: './stuff.component.scss'
})
export default class StuffComponent implements OnInit {

  stuff: Stuff[]

  constructor(private stuffService: StuffService) { }
  ngOnInit(): void {
    this.stuffService.getAll().subscribe(r => this.stuff = r);
  }
}
