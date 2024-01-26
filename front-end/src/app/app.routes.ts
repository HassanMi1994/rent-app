import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';

export const routes: Routes = [

    { component: CustomerComponent, path: 'customers', data: { animation: 'insertRemovePage' } },
    { component: CreateCustomerComponent, path: 'customers/new', data: { animation: 'insertRemovePage' } },
    { component: WelcomePageComponent, path: 'welcome-page', data: { animation: 'insertRemovePage' } },
    { path: '', redirectTo: 'welcome-page', pathMatch: 'full', data: { animation: 'insertRemovePage' } },
    { path: '**', component: PageNotFoundComponent, data: { animation: 'insertRemovePage' } },  // Wildcard route for a 404 page
];
