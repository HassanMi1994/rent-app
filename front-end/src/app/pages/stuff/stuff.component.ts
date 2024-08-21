import { Component, OnInit, ViewChild } from '@angular/core';
import { Stuff } from '../../models/stuff.model';
import { CreateStuffComponent } from './create-stuff/create-stuff.component';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { PopUpComponent } from '../../utils/pop-up/pop-up.component';
import { FormInputComponent } from '../../utils/form-input/form-input.component';
import { FormsModule } from '@angular/forms';
import { StuffService } from '../../services/stuff.service';

@Component({
  selector: 'app-stuff',
  standalone: true,
  imports: [CreateStuffComponent, RouterLink, TranslocoPipe, PopUpComponent, FormInputComponent, FormsModule],
  templateUrl: './stuff.component.html',
  styleUrl: './stuff.component.scss'
})
export default class StuffComponent implements OnInit {

  @ViewChild('popUp') child: PopUpComponent;

  constructor(public stuffService: StuffService, transLoco: TranslocoService) {
  }
  ngOnInit(): void {
    this.stuffService.getStuff();
  }

  showMoreInfo(e: MouseEvent, stuffId: number) {
    var selectedStuff = this.stuffService.stuff.find(x => x.id == stuffId) as Stuff;
    this.child.setTitle(selectedStuff?.name)
    this.child.showObject(selectedStuff);
    this.child.show({ x: e.clientX, y: e.clientY });
    let popUp = document.getElementById('morePopUp') as HTMLDivElement
    popUp.style.top = e.y + 'px'
    popUp.style.left = e.x + 'px'
  }
}
