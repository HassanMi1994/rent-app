import exp from "constants";

export enum ContractStatus {
    Draft,
    Opened,
    ReturnedEverythingButShouldGiveMoney,
    DoesNotRespond,
    ClosedSuccessfuly,
}

export enum Currency {
    USDollar,
    Toman,
}

export class StaticModels {
    ServiceType = [
        {
            Name: 'Rent',
            Id: 1
        },
        {
            Name: 'Sell',
            Id: 2
        },
        {
            Name: 'Both',
            Id: 3
        }];

}
export enum ContractType {
    Rent,
    Sell
}

export enum ItemStatus {
    Renting,
    Sold,
    ReturnedOk,
    ReurnedNotOk
}

export enum RentCalculationType {
    Hourly,
    DailyRoundToUp,
    DailyRoundToDown
}