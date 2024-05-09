import exp from "constants";
import { ContractType } from "./ContractType";

//todo: need to check if this static model is used, and refine it!
export class StaticModels {
    ServiceType = [
        {
            Name: 'Rent',
            Id: 1
        },
        {
            Name: 'Sell',
            Id: 2
        }];
}

export default ContractType;