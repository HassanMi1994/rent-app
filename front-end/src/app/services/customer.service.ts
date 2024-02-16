import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers$: Observable<Customer[]>;
  customers: Customer[];

  constructor(private client: HttpClient) { }

  create(customer: Customer) {
    this.client.post('https://localhost:7053/api/customers', customer)
      .subscribe(x => {
        this.customers$.pipe(tap(x => x = [customer, ...this.customers]));
      });
  }

  getAll(): Observable<Customer[]> {
    this.customers$ = this.client.get<Customer[]>('https://localhost:7053/api/customers');
    this.customers$.subscribe(x => this.customers = x);
    return this.customers$;
  }
}
