import { Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CreateCustomerComponent } from './pages/customer/create-customer/create-customer.component';
import StuffComponent from './pages/stuff/stuff.component';
import { CreateStuffComponent } from './pages/stuff/create-stuff/create-stuff.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { CreateContractComponent } from './pages/contracts/create-contract/create-contract.component';


//todo: titles should be set dynamically

export const routes: Routes = [

    { component: ContractsComponent, path: ':{lang}/contracts', },
    { component: CreateContractComponent, path: ':{lang}/contracts/new', },
    { component: CustomerComponent, path: ':{lang}/customers', },
    { component: CreateCustomerComponent, path: ':{lang}/customers/new' },
    { component: WelcomeComponent, path: ':{lang}/welcome' },
    { component: StuffComponent, path: ':{lang}/stuff' },
    { component: CreateStuffComponent, path: ':{lang}/stuff/new' },
    { path: 'en/welcome', redirectTo: 'en/welcome', pathMatch: 'full', },
    { path: '', redirectTo: 'en/welcome', pathMatch: 'full', },
    { path: '**', component: PageNotFoundComponent }
];
