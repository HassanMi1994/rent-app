import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { FormInputComponent } from '../../utils/form-input/form-input.component';
import { ToastComponent } from '../../utils/toast/toast.component';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { PopUpComponent } from '../../utils/pop-up/pop-up.component';


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [TranslocoPipe, RouterLink, CreateCustomerComponent, FormInputComponent, ToastComponent, PopUpComponent],
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

  @ViewChild('popup') popup: PopUpComponent;
  transLoco: TranslocoService

  customers: Customer[];

  constructor(private customerService: CustomerService, transLoco: TranslocoService) {
    this.transLoco = transLoco;
  }
  ngOnInit(): void {
    this.customerService
      .getAll()
      .subscribe(x => this.customers = x);
  }

  showMoreInfo(e: MouseEvent, stuffId: number) {
    var selectedStuff = this.customers.find(x => x.id == stuffId) as Customer;
    this.popup.setTitle(selectedStuff?.fullName)
    this.popup.showObject(selectedStuff);
    this.popup.show();
    let popUp = document.getElementById('morePopUp') as HTMLDivElement
    popUp.style.top = e.y + 'px'
    popUp.style.left = e.x + 'px'
  }
}
