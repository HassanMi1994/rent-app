import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [TranslocoPipe, RouterLink,CreateCustomerComponent],
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
export class CustomerComponent {

}
