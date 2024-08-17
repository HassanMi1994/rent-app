import { Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CreateCustomerComponent } from './pages/customer/create-customer/create-customer.component';
import StuffComponent from './pages/stuff/stuff.component';
import { CreateStuffComponent } from './pages/stuff/create-stuff/create-stuff.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { CreateContractComponent } from './pages/contracts/create-contract/create-contract.component';
import { ContractDetailsComponent } from './pages/contracts/contract-details/contract-details.component';
import { SettingComponent } from './pages/config/config.component';
import { LoginComponent } from './pages/_login_signup/login/login.component';
import { SignUpComponent } from './pages/_login_signup/sign-up/sign-up.component';
import { UsersComponent } from './pages/users/users.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { AboutComponent } from './pages/about/about.component';



//todo: titles should be set dynamically

export const routes: Routes = [
    { component: LoginComponent, path: ':{lang}/login', title: "RSApp.ir: Comprehensive Rental Management Solution" },
    { component: SignUpComponent, path: ':{lang}/sign-up', title: "RSApp.ir: Comprehensive Rental Management Solution" },
    { component: ContractsComponent, path: ':{lang}/contracts', },
    { component: CreateContractComponent, path: ':{lang}/contracts/new', },
    { component: ContractDetailsComponent, path: ':{lang}/contracts/details/:{id}}', },
    { component: UsersComponent, path: ':{lang}/users', },
    { component: CreateUserComponent, path: ':{lang}/users/new', },
    { component: CustomerComponent, path: ':{lang}/customers', title: "RSApp.ir: Comprehensive Rental Management Solution" },
    { component: CreateCustomerComponent, path: ':{lang}/customers/new', title: "RSApp.ir: Comprehensive Rental Management Solution" },
    { component: WelcomeComponent, path: ':{lang}/welcome', title: "RSApp.ir: Comprehensive Rental Management Solution" },
    { component: StuffComponent, path: ':{lang}/stuff' },
    { component: CreateStuffComponent, path: ':{lang}/stuff/new' },
    { component: SettingComponent, path: ':{lang}/settings' },
    { component: HowItWorksComponent, path: ':{lang}/features', title: "RSApp.ir: Comprehensive Rental Management Solution" },
    { component: AboutComponent, path: ':{lang}/about', title: "RSApp.ir: Comprehensive Rental Management Solution" },
    { path: 'en/welcome', redirectTo: 'en/welcome', pathMatch: 'full', },
    { path: '', redirectTo: 'en/welcome', pathMatch: 'full', },
    { path: '**', component: PageNotFoundComponent }
];
