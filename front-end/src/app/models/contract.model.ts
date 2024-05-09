import { Payment } from "../services/contract.service";
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
    totalPricePerDay: number;
    totalPaidAmount: number
    status: ContractStatus;
    items: ContractItem[] = [];
    payments: Payment[] = [];
    customer: Customer = new Customer();

    constructor() {
        super()
        // this.persianDateTime = `${this.date.toLocaleDateString('fa-IR')} ${this.date.getHours()}:${this.date.getMinutes()}`;
    }

    addPayment(payment: Payment) {
        this.payments.push(payment);
    }
}