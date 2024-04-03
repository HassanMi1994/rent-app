import { ContractType, Currency, RentCalculationType, ServiceType } from "./enum/contractStatus.enum"

export class UserConfig {

    id: number
    userID: number
    contractNoSeed: number
    //locale: string
    taxPercent: number
    DefaultContractType: ContractType
    serviceType: ServiceType
    rentCalculationType: RentCalculationType
    currency: Currency
    createdAt: Date
    updatedAt: Date
}

export class Config {

}

