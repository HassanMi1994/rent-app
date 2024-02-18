import { baseModel } from "./base.model"
import { ContractItem } from "./contractItem.model"
import { Customer } from "./customer.model"

export enum ContractStatus {
    Draft,
    Opened,
    ReturnedEverythingButShouldGiveMoney,
    DoesNotRespond,
    ClosedSuccessfuly,
}

export class Contract extends baseModel {

    id: number;
    customerID: number;
    date: Date;
    persianDateTime: string;
    rentLocation: string;
    howManyDaysClaim: number;
    prePaidMoney: number;
    totalPricePerDay: number;
    status: ContractStatus;
    items: ContractItem[] = [];
    customer: Customer = new Customer();

    constructor() {
        super()
       // this.persianDateTime = `${this.date.toLocaleDateString('fa-IR')} ${this.date.getHours()}:${this.date.getMinutes()}`;
    }
}