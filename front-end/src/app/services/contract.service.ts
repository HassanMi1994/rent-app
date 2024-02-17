import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contract } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  constructor(private client: HttpClient) { }

  contracts$: Observable<Contract[]>
  contracts: Contract[];
  selectedContractId: number = 0;

  create(contract: Contract) {
    this.client.post('https://localhost:7053/api/contracts', contract)
      .subscribe(x => {
        // this.notifier.notify('success', 'a new customer was added');
      });
  }

  getAll(): Observable<Contract[]> {
    this.contracts$ = this.client.get<Contract[]>('https://localhost:7053/api/contracts');
    this.contracts$.subscribe(x => this.contracts = x);
    return this.contracts$;
  }

  getById(): Observable<Contract> {
    return this.client.get<Contract>(`https://localhost:7053/api/contracts/${this.selectedContractId}`);
  }
}
