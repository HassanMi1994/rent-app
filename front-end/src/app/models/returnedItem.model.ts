import { ItemStatus } from "./enum/ItemStatus";
import { ReturnStatus } from "./enum/ReturnStatus";

export class ReturnedItem {
    id: number;
    contractItemID: number;
    quantity: number;
    price: number;
    calculatedPrice: number;
    returnDateTime: Date = new Date();
    itemStatus: ReturnStatus;
}