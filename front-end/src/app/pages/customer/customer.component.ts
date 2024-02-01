import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { FormInputComponent } from '../../utils/form-input/form-input.component';
import { ToastComponent } from '../../utils/toast/toast.component';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [TranslocoPipe, RouterLink, CreateCustomerComponent, FormInputComponent, ToastComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
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
export class CustomerComponent implements OnInit {

  customers: Customer[];

  constructor(private customerService: CustomerService) {
  }
  ngOnInit(): void {
    this.customerService
      .getAll()
      .subscribe(x => this.customers = x);
  }



}
