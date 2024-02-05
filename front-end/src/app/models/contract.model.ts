import { RentedStuff } from "./rentedStuff.model"

export class Contract {

    id: number
    customerID: number
    howManyDaysClaim: number
    prePaidMoney: number
    totalPricePerDay: number
    createdAt: Date
    updatedAt: Date
    contractStuffs: RentedStuff[]
}