import { CalendarType } from "./enum/calendar-type"
import { ContractType } from "./enum/ContractType"
import { Currency } from "./enum/Currency"
import { RentCalculationType } from "./enum/RentCalculationType"

export class UserConfig {

    id: number
    userID: number
    contractNoSeed: number
    //locale: string
    taxPercent: number
    DefaultContractType: ContractType
    serviceType: number
    rentCalculationType: RentCalculationType
    calendarType: CalendarType
    currency: Currency
    createdAt: Date
    updatedAt: Date
}

export class Config {

}

