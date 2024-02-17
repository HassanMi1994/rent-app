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
 private _searchTerm: string = '';
  stuff: Stuff[];
  transLoco: TranslocoService;

  get searchTerm(): string {
    return this._searchTerm;
  }
  
  set searchTerm(value: string) {
    if (value !== this._searchTerm) {
      this._searchTerm = value;
      this.serachTermChanged();
    }
  }

  @ViewChild('popUp') child: PopUpComponent;

  constructor(private stuffService: StuffService, transLoco: TranslocoService) {
    this.transLoco = transLoco;
  }
  ngOnInit(): void {
    this.stuffService.getStuff().subscribe(r => {
      this.stuff = r;
    });
  }

  serachTermChanged() {
    this.stuff = this.stuffService.stuff.filter(x => x.name.includes(this.searchTerm));
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
