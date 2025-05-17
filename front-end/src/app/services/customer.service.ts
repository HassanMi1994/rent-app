import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, EnvironmentProviders, Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers$: Observable<Customer[]>;
  filterdCustomers: Customer[];
  customers: Customer[];

  constructor(private client: HttpClient,
    private toast: ToastrService,
    private transloco: TranslocoService) {
  }

  create(customer: Customer) {
    this.client.post(environment.baseUrl + 'customers', customer)
      .subscribe(x => {
        this.customers$.pipe(tap(x => x = [customer, ...this.customers]));
        this.customers = [customer, ...this.customers]
        this.filterdCustomers = this.customers;
        let message = this.transloco.translate('createdSuccessfuly');
        this.toast.info(message);
      });
  }

    edit(customer: Customer) {
    this.client.put(environment.baseUrl + 'customers', customer)
      .subscribe(x => {
        // this.customers$.pipe(tap(x => x = [customer, ...this.customers]));
        // this.customers = [customer, ...this.customers]
        this.filterdCustomers = this.customers;
        let message = this.transloco.translate('updatedSuccessfuly');
        this.toast.info(message);
      });
  }

  getByID(id: number): Customer {
    let found = this.customers.filter(x => x.id == id);
    return found[0];
  }

  getAll(): Observable<Customer[]> {
    this.customers$ = this.client.get<Customer[]>(environment.baseUrl + 'customers');
    this.customers$.subscribe(x => this.customers = this.filterdCustomers = x);
    return this.customers$;
  }
}
