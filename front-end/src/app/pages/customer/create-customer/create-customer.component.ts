import { Component, EnvironmentInjector, EventEmitter, ViewChildren } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Customer, CustomerValidator } from '../../../models/customer.model';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [TranslocoPipe, FormInputComponent, RouterLink, FormsModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss',
})
export class CreateCustomerComponent {
  customer: Customer = new Customer();
  transLoco: TranslocoService;
  @ViewChildren('inputs') inputs:FormInputComponent[];

  constructor(private customerService: CustomerService, private router: Router, transLoco: TranslocoService) {
    this.transLoco = transLoco;
  }

  create() {


    let validation = new CustomerValidator(this.transLoco);
    let errors = validation.validate(this.customer);

    let keys = Object.keys(errors);

    if (errors) {
      this.inputs.forEach(element => {
        if (keys.find(x => x == element.labelName)) {
          let key = element.labelName as keyof typeof errors;
          element.setInvalid(errors[key] as string)
        }
        else {
          element.setValid();
        }
      })
    }

    if (keys.length == 0) {
      this.customerService.create(this.customer);
      this.router.navigateByUrl('/' + this.transLoco.getActiveLang() + '/customers');
    }
  }
}
