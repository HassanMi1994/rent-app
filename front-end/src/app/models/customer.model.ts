import { baseModel } from "./base.model";

export class Customer extends baseModel {
    id: number;
    fullName: string = ''
    nationalityCode: string = ''
    fatherName: string = '';
    mobile: string = '';
    address: string = '';
    refereeName: string = '';
}