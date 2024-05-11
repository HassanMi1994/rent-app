import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contract } from '../models/contract.model';
import { PaymentType } from "../models/enum/PaymentType";
import { ReturnedItem } from '../models/returnedItem.model';

export class Payment {
  amount: number;
  paymentType: PaymentType
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
    this.client.post('https://localhost:7053/api/contracts', contract)
      .subscribe(x => this.contracts = this.filterdContracts = [contract, ...this.contracts]);
  }

  addPaymentLocaly() {
    this.contract.payments.push(this.newPayment);
    this.newPayment = new Payment();
  }

  addPayment() {
    this.client.post(`https://localhost:7053/api/contracts/` + this.contract.id + '/add-payment', this.newPayment)
      .subscribe(x => this.newPayment = new Payment())
  }

  addReturn() {
    var observable = this.client.post<Contract>(`https://localhost:7053/api/contracts/` + this.contract.id + '/return-item', this.newReturnItem);
    observable.subscribe(x => {
      this.newReturnItem = new ReturnedItem();
      this.contract = x;
    });
    return observable;
  }

  getAll(): Observable<Contract[]> {
    this.contracts$ = this.client.get<Contract[]>('https://localhost:7053/api/contracts');
    this.contracts$.subscribe(x => this.contracts = this.filterdContracts = x);
    return this.contracts$;
  }

  getById(): Observable<Contract> {
    let observable = this.client.get<Contract>(`https://localhost:7053/api/contracts/${this.selectedContractId}`);
    observable.subscribe(x => this.contract = x);
    return observable;
  }

  serach(term: string) {
    this.filterdContracts = this.contracts.filter(x => x.customer.fullName.toLowerCase().includes(term.toLowerCase()));
  }
}
