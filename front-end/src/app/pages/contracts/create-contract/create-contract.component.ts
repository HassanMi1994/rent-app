import { Component, OnChanges, QueryList, SimpleChanges, ViewChild, ViewChildren, input } from '@angular/core';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { Contract } from '../../../models/contract.model';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { StuffService } from '../../../services/stuff.service';
import { CustomerService } from '../../../services/customer.service';
import { Stuff } from '../../../models/stuff.model';
import { Customer } from '../../../models/customer.model';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { FormInputNumberComponent } from '../../../utils/form-input-number/form-input-number.component';
import { ContractItem } from '../../../models/contractItem.model';
import { FormInputDateComponent } from '../../../utils/form-input-date/form-input-date.component';

@Component({
  selector: 'app-create-contract',
  standalone: true,
  imports: [FormInputComponent, TranslocoPipe, NgSelectModule, FormsModule, CommonModule, RouterLink, FormInputNumberComponent, FormInputComponent, FormInputDateComponent],
  templateUrl: './create-contract.component.html',
  styleUrl: './create-contract.component.scss'
})
export class CreateContractComponent implements OnChanges {

  @ViewChildren('inputRef') private itemInputs: FormInputComponent[];
  @ViewChild('pricePerDayRef') private pricePerDayInput: FormInputNumberComponent;
  @ViewChildren('inputNumRef') private itemNumInputs: FormInputComponent[];

  selectedStuff: Stuff;
  selectedStuffId: number;

  contract: Contract = new Contract();
  contractItem: ContractItem = new ContractItem();
  selectedCustomer: Customer;
  selectedCustomerId: number;
  totalPriceForItem: number;
  public inputSearchCustomer$ = new Subject<string>();
  public inputSearchStuff$ = new Subject<string>();

  @ViewChild('selectStuff') selectStuff: NgSelectComponent

  constructor(public stuffService: StuffService,
    public customerService: CustomerService,
    public contractService: ContractService,
    private router: Router,
    private transLoco: TranslocoService) {

    //#region stuff

    this.stuffService.getStuff();
    this.inputSearchStuff$.pipe(map((term) => { this.searchInStuff(term) }));
    //#endregion

    this.inputSearchCustomer$
      .pipe(map((term) => this.searchInCustomers(term)))
    //#endregion

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.totalPriceForItem = this.selectedStuff.quantity * this.pricePerDayInput.getValue();
  }

  searchInCustomers(term: string): Customer[] {
    console.warn(`${this.selectedCustomer}`);
    console.warn(`${this.selectedStuff}`);
    if (term != undefined && term != '') {
      let jjj = this.customerService.customers.filter(x => x.fullName.includes(term));
      this.customerService.filterdCustomers = jjj;
    }
    return this.customerService.customers;
  }

  searchInStuff(term: string): Stuff[] {
    if (term != undefined && term != '') {
      let jjj = this.stuffService.stuff.filter(x => { x.name.includes(term) });
      this.stuffService.filterdStuff = jjj;
    }
    return this.stuffService.stuff;
  }

  addItem() {
    this.contractItem.rentDate = new Date();
    this.contractItem.stuff = this.selectedStuff;
    this.contractItem.stuffID = this.selectedStuff.id;
    this.contract.items.push(this.contractItem);
    this.contractItem = new ContractItem();

    this.itemNumInputs.forEach(input => input.setValue('0'));
    this.itemInputs.forEach(input => input.setValue(''));
    this.selectStuff.handleClearClick();
    this.pricePerDayInput.setValue(0);
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

  save() {
    console.log(this.contract);
    this.contractService.create(this.contract);
    this.router.navigateByUrl('/' + this.transLoco.getActiveLang() + '/contracts');
  }

  selectedCustomerChanged(event$: Customer) {
    this.contract.customer = event$;
    this.contract.customerID = event$.id;
    console.log(event$);
  }

  selectedStuffChanged(event$: Stuff) {
    this.selectedStuff = event$;
    this.pricePerDayInput.setValue(event$.pricePerDay);
  }
}