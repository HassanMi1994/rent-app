import { Component, OnInit, ViewChild } from '@angular/core';
import { Stuff } from '../../models/stuff.model';
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

  @ViewChild('popUp') child: PopUpComponent;

  constructor(private stuffService: StuffService) { }
  ngOnInit(): void {
    this.stuffService.getAll().subscribe(r => this.stuff = r);
  }

  showMoreInfo(e: MouseEvent, stuffId: number) {
    var selectedStuff = this.stuff.find(x => x.id == stuffId) as Stuff;
    this.child.setTitle(selectedStuff?.name)
    this.child.showObject(selectedStuff);
    this.child.show();
    let popUp = document.getElementById('morePopUp') as HTMLDivElement
    popUp.style.top = e.y + 'px'
    popUp.style.left = e.x + 'px'
  }
}
