import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contract } from '../models/contract.model';
import { PaymentType } from "../models/enum/PaymentType";
import { ReturnedItem } from '../models/returnedItem.model';
import { ContractStatus } from '../models/enum/ContractStatus';
import { environment } from '../../environments/environment';

export class Payment {
  amount: number;
  paymentType: PaymentType
  dateTime: Date
}

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  constructor(private client: HttpClient) { }

  contracts$: Observable<Contract[]>
  contracts: Contract[];
  filterdContracts: Contract[];
  selectedContractId: number = 0;
  contract$: Subject<Contract> = new Subject<Contract>();
  contract: Contract = new Contract();
  newPayment: Payment = new Payment();
  newReturnItem: ReturnedItem = new ReturnedItem();

  public _searchTerm: string = '';

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    if (value !== this._searchTerm) {
      this._searchTerm = value;
      this.filterdContracts = this.contracts.filter(x => x.customer.fullName.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    }
  }

  create(contract: Contract) {
    contract.payments = this.contract.payments;
    this.client.post<Contract>(environment.baseUrl + 'contracts', contract)
      .subscribe(x => {
        //todo: this won't work because we don't load the customer so temprairly we will use getAll();
        // this.contracts = this.filterdContracts = [x, ...this.contracts];
        this.getAll();
      });
  }

  changeStatus(contractStatus: ContractStatus) {
    let observable = this.client.patch<Contract>(environment.baseUrl + `contracts/${this.contract.id}/change-status/${contractStatus}`, contractStatus);
    observable.subscribe(x => {
      this.contract = x;
      this.contract$.next(x);
    });
  }

  addPaymentLocaly() {
    this.contract.payments.push(this.newPayment);
    this.newPayment = new Payment();
  }

  addPayment() {
    let observable = this.client.post<Contract>(environment.baseUrl + `contracts/` + this.contract.id + '/add-payment', this.newPayment);
    observable.subscribe(x => {
      this.newPayment = new Payment();
      this.contract = x;
      this.contract$.next(x);
    });
    return observable
  }

  addReturn() {
    let observable = this.client.post<Contract>(environment.baseUrl + `contracts/${this.contract.id}/return-item`, this.newReturnItem);
    observable.subscribe(x => {
      this.newReturnItem = new ReturnedItem();
      this.contract = x;
      this.contract$.next(x);
    });
    return observable;
  }

  getAll(): Observable<Contract[]> {
    this.contracts$ = this.client.get<Contract[]>(environment.baseUrl + 'contracts');
    this.contracts$.subscribe(x => this.contracts = this.filterdContracts = x);
    return this.contracts$;
  }

  getById(): Observable<Contract> {
    let observable = this.client.get<Contract>(environment.baseUrl + `contracts/${this.selectedContractId}`);
    observable.subscribe(x => {
      this.contract = x;
      this.contract$.next(x);
    });
    return observable;
  }

  serach(term: string) {
    this.filterdContracts = this.contracts.filter(x => x.customer.fullName.toLowerCase().includes(term.toLowerCase()));
  }
}
