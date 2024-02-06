import { Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { CreateCustomerComponent } from './pages/customer/create-customer/create-customer.component';
import StuffComponent from './pages/stuff/stuff.component';
import { CreateStuffComponent } from './pages/stuff/create-stuff/create-stuff.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { CreateContractComponent } from './pages/contracts/create-contract/create-contract.component';


//todo: titles should be set dynamically

export const routes: Routes = [

    { component: ContractsComponent, path: 'contracts', },
    { component: CreateContractComponent, path: 'contracts/new', },
    { component: CustomerComponent, path: 'customers', },
    { component: CreateCustomerComponent, path: 'customers/new' },
    { component: WelcomePageComponent, path: 'welcome-page' },
    { component: StuffComponent, path: 'stuff' },
    { component: CreateStuffComponent, path: 'stuff/new' },
    { path: '', redirectTo: 'welcome-page', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
