import { Component } from '@angular/core';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { Contract } from '../../../models/contract.model';
import { TranslocoPipe } from '@ngneat/transloco';
import { StuffService } from '../../../services/stuff.service';
import { CustomerService } from '../../../services/customer.service';
import { Stuff } from '../../../models/stuff.model';
import { Customer } from '../../../models/customer.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, catchError, concat, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { FormInputNumberComponent } from '../../../utils/form-input-number/form-input-number.component';
import { ContractItem } from '../../../models/contractItem.model';

@Component({
  selector: 'app-create-contract',
  standalone: true,
  imports: [FormInputComponent, TranslocoPipe, NgSelectModule, FormsModule, CommonModule, RouterLink, FormInputNumberComponent, FormInputComponent],
  templateUrl: './create-contract.component.html',
  styleUrl: './create-contract.component.scss'
})
export class CreateContractComponent {

  contract: Contract = new Contract();
  contractItem: ContractItem = new ContractItem();
  stuff$: Observable<Stuff[]>
  stuff: Stuff[];
  customers$: Observable<Customer[]>;
  customers: Customer[];
  ngSelectTypeStuff$: Subject<string>
  public inputSearchCustomer$ = new Subject<string>();

  public inputSearchStuff$ = new Subject<string>();

  constructor(private stuffService: StuffService,
    private customerService: CustomerService,
    private contractService: ContractService) {
    this.stuff$ = this.stuffService.getAll();
    this.stuff$.subscribe(x => this.stuff = x);
    this.stuff$ = this.inputSearchStuff$.pipe(
      map((term) => this.searchInStuff(term))
    )
    this.customers$ = this.customerService.getAll();
    this.customers$.subscribe(x => this.customers = x);

    this.inputSearchCustomer$.subscribe((newTerm) => {
      // const logLine = `Typeahead emit: ${newTerm}\n`;
      // this.codeRef.nativeElement.innerText += logLine;
    });

    this.customers$ = this.inputSearchCustomer$.pipe(
      map((term) => this.searchInCustomers(term))
    )
  }

  searchInCustomers(term: string): Customer[] {
    if (term != undefined && term != '')
      return this.customers.filter(x => x.fullName.includes(term));

    return this.customers;
  }

  searchInStuff(term: string): Stuff[] {
    if (term != undefined && term != '')
      return this.stuff.filter(x => x.name.includes(term));

    return this.stuff;
  }

  addItem() {
    this.contractItem.rentDate = new Date();
    this.contract.contractStuffs.push(this.contractItem);
    this.contractItem = new ContractItem();
  }


  create() {
    console.log('create was called!');
  }

  deleteItem(event: Event) {
    console.log(this.contract);
    console.log(this.contractItem);
    let element = event.srcElement as HTMLElement;
    let contractItem = element.closest('.contract-item') as HTMLDivElement;
    contractItem.remove();
  }

  editItem(event: Event) {
    event.preventDefault();
  }

  moreInfo(event: Event) {
    event.preventDefault();
  }
}
