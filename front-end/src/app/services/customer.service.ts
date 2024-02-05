import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private client: HttpClient) { }

  create(customer: Customer) {
    this.client.post('https://localhost:7053/api/customers', customer)
      .subscribe(x => {
        // this.notifier.notify('success', 'a new customer was added');
      });
  }

  getAll(): Observable<Customer[]> {
    return this.client.get<Customer[]>('https://localhost:7053/api/customers');
  }
}
