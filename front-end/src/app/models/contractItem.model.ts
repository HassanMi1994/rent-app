import { ItemStatus } from "./enum/contractStatus.enum";
import { Stuff } from "./stuff.model";

export class ContractItem {
    id: number;
    stuffID: number;
    quantity: number;
    rentDate: Date;
    pricePerDay: number;
    description: string;
    status: ItemStatus;
    lastStatusChangeDate: Date
    stuff: Stuff = new Stuff();
}