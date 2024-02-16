import { baseModel } from "./base.model"
import { ContractItem } from "./contractItem.model"
import { Customer } from "./customer.model"

export class Contract extends baseModel {

    id: number;
    customerID: number;
    howManyDaysClaim: number;
    date: Date;
    prePaidMoney: number;
    totalPricePerDay: number;
    rentLocation: string;
    items: ContractItem[] = [];
    customer: Customer = new Customer();
}