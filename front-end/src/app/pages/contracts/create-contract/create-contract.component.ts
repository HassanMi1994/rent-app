import { Component } from '@angular/core';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { Contract } from '../../../models/contract.model';
import { TranslocoPipe } from '@ngneat/transloco';
import { StuffService } from '../../../services/stuff.service';
import { CustomerService } from '../../../services/customer.service';
import { Stuff } from '../../../models/stuff.model';
import { Customer } from '../../../models/customer.model';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContractService } from '../../../services/contract.service';

@Component({
  selector: 'app-create-contract',
  standalone: true,
  imports: [FormInputComponent, TranslocoPipe, NgSelectModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './create-contract.component.html',
  styleUrl: './create-contract.component.scss'
})
export class CreateContractComponent {

  contract: Contract = new Contract();
  stuff$: Observable<Stuff[]>
  customers$: Observable<Customer[]>;
  selectedCustomerId: number;

  constructor(private stuffService: StuffService, private customerService: CustomerService, private contractService: ContractService) {
    this.stuff$ = this.stuffService.getAll();
    this.customers$ = this.customerService.getAll()
  }

  create() {
    console.log('create was called!');
  }

}
