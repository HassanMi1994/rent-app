import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';

export const routes: Routes = [

    {component:CustomerComponent, path: 'customer/create'},
    {component:CreateCustomerComponent, path: 'customer/new'},
    {component: WelcomePageComponent, path: 'welcome-page'},
    { path: '',   redirectTo: 'welcome-page', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
