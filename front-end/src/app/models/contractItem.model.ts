import { Stuff } from "./stuff.model";

export class ContractItem {
    id: number;
    stuffID: number;
    quantity: number;
    rentDate: Date;
    pricePerDay: number;
    description: string;
    isReturned: boolean;
    isReturnedSafe: boolean;
    stuff: Stuff = new Stuff();
}