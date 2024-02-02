import { Component } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { Stuff } from '../../../models/stuff';
import { Router, RouterLink } from '@angular/router';
import { StuffService } from '../../../services/stuff.service';
import { FormInputNumberComponent } from '../../../utils/form-input-number/form-input-number.component';

@Component({
  selector: 'app-create-stuff',
  standalone: true,
  imports: [TranslocoPipe, FormInputComponent, FormInputNumberComponent, RouterLink],
  templateUrl: './create-stuff.component.html',
  styleUrl: './create-stuff.component.scss'
})
export class CreateStuffComponent {
  stuff: Stuff = new Stuff();

  constructor(private stuffService: StuffService, private router: Router) { }

  create() {
    this.stuffService.create(this.stuff);
    this.router.navigateByUrl('stuff');
  }
}
