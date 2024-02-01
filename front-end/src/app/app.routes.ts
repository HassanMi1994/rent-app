import { Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { CreateCustomerComponent } from './pages/customer/create-customer/create-customer.component';
import StuffComponent from './pages/stuff/stuff.component';
import { CreateStuffComponent } from './pages/stuff/create-stuff/create-stuff.component';

export const routes: Routes = [

    { component: CustomerComponent, path: 'customers', data: { animation: 'insertRemovePage' } },
    { component: CreateCustomerComponent, path: 'customers/new', data: { animation: 'insertRemovePage' } },
    { component: WelcomePageComponent, path: 'welcome-page', data: { animation: 'insertRemovePage' } },
    { component: StuffComponent, path: 'stuff', data: { animation: 'insertRemovePage' } },
    { component: CreateStuffComponent, path: 'stuff/new', data: { animation: 'insertRemovePage' } },
    { path: '', redirectTo: 'welcome-page', pathMatch: 'full', data: { animation: 'insertRemovePage' } },
    { path: '**', component: PageNotFoundComponent, data: { animation: 'insertRemovePage' } },  // Wildcard route for a 404 page
];
