import { Component, inject, ViewChildren } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { Stuff, StuffValidator } from '../../../models/stuff.model';
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
  @ViewChildren('inputs') inputs: any[];

  stuff: Stuff = new Stuff();
  transLoco: TranslocoService;

  constructor(private stuffService: StuffService, private router: Router, transLoco: TranslocoService) {
    this.transLoco = transLoco;
  }

  create() {
    let keys = this.getErrors();

    if (keys.length == 0) {
      this.stuffService.create(this.stuff);
      this.router.navigateByUrl('/' + this.transLoco.getActiveLang() + '/stuff');
    }
  }

  private getErrors() {
    let validation = new StuffValidator(this.transLoco);
    let errors = validation.validate(this.stuff);

    let keys = Object.keys(errors);

    if (errors) {
      this.inputs.forEach(element => {
        if (keys.find(x => x == element.labelName)) {
          let key = element.labelName as keyof typeof errors;
          element.setInvalid(errors[key] as string);
        }
        else {
          element.setValid();
        }
      });
    }
    return keys;
  }
}
