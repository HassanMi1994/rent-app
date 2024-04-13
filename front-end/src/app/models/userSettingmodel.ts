import { ContractType, Currency, RentCalculationType } from "./enum/allEnums.enum"

export class UserConfig {

    id: number
    userID: number
    contractNoSeed: number
    //locale: string
    taxPercent: number
    DefaultContractType: ContractType
    serviceType: number
    rentCalculationType: RentCalculationType
    currency: Currency
    createdAt: Date
    updatedAt: Date
}

export class Config {

}

