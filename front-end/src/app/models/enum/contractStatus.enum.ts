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

export enum ServiceType {
    Rent = 1,//001
    Sell = 2,//010
    Both = 3 //011
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