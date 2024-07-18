import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers$: Observable<Customer[]>;
  filterdCustomers: Customer[];
  customers: Customer[];

  constructor(private client: HttpClient,
    private toast: ToastrService,
    private transloco: TranslocoService) { }

  create(customer: Customer) {
    this.client.post('https://localhost:7053/api/customers', customer)
      .subscribe(x => {
        this.customers$.pipe(tap(x => x = [customer, ...this.customers]));
        this.customers = [customer, ...this.customers]
        this.filterdCustomers = this.customers;
        let message = this.transloco.translate('createdSuccessfuly');
        this.toast.info(message);
      });
  }

  getAll(): Observable<Customer[]> {
    this.customers$ = this.client.get<Customer[]>('https://localhost:7053/api/customers');
    this.customers$.subscribe(x => this.customers = this.filterdCustomers = x);
    return this.customers$;
  }
}
