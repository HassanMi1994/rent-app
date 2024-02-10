import { Stuff } from "./stuff.model";

export class ContractItem {
    id: number;
    stuffID: number;
    quantity: number;
    rentDate: Date;
    pricePerDay: number;
    description: string;
    stuff: Stuff = new Stuff();
}