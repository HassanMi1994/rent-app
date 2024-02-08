import { Component, EnvironmentInjector, EventEmitter } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../../models/customer.model';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [TranslocoPipe, FormInputComponent, RouterLink, FormsModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss',
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class CreateCustomerComponent {
  customer: Customer = new Customer();
  transLoco: TranslocoService;

  constructor(private customerService: CustomerService, private router: Router, transLoco: TranslocoService) {
    this.transLoco = transLoco;
  }

  create() {
    this.customerService.create(this.customer);
    this.router.navigateByUrl('/' + this.transLoco.getActiveLang() + '/customers');
  }
}
