import { Currency, RentCalculationType, ServiceType } from "./enum/contractStatus.enum"

export class Setting {

    id: number
    userID: number
    contractNoSeed: number
    locale: string
    taxPercent: number
    serviceType: ServiceType
    rentCalculationType: RentCalculationType
    currency: Currency
    createdAt: Date
    updatedAt: Date
}