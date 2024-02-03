import { Component, OnInit } from '@angular/core';
import { Stuff } from '../../models/stuff';
import { StuffService } from '../../services/stuff.service';
import { CreateStuffComponent } from './create-stuff/create-stuff.component';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { PopUpComponent } from '../../utils/pop-up/pop-up.component';

@Component({
  selector: 'app-stuff',
  standalone: true,
  imports: [CreateStuffComponent, RouterLink, TranslocoPipe, PopUpComponent],
  templateUrl: './stuff.component.html',
  styleUrl: './stuff.component.scss'
})
export default class StuffComponent implements OnInit {

  stuff: Stuff[]

  constructor(private stuffService: StuffService) { }
  ngOnInit(): void {
    this.stuffService.getAll().subscribe(r => this.stuff = r);
  }

  showMoreInfo(e: MouseEvent, stuffId: number) {
    console.log(e);
    console.log(this.stuff.find(x => x.id == stuffId))
    let popUp = document.getElementById('morePopUp' + stuffId) as HTMLDivElement
    popUp.classList.remove('visually-hidden');
    popUp.style.top = e.clientY + 'px'
    popUp.style.left = e.clientX + 'px'
  }
}
