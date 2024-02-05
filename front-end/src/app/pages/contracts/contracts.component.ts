import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [NgSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss'
})
export class ContractsComponent {

  selectedCustomerId: number;
  customers: Customer[]

  constructor(private customerService: CustomerService) {

    this.customerService.getAll().subscribe(result => {
      this.customers = result;
    });

  }
}
