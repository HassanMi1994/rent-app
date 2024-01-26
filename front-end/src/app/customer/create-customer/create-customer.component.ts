import { Component } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [TranslocoPipe],
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

}
