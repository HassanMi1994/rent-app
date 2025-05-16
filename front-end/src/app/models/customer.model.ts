import { Validator } from "fluentvalidation-ts";
import { baseModel } from "./base.model";
import { TranslocoService } from "@ngneat/transloco";

export class Customer extends baseModel {
    id: number;
    fullName: string = ''
    nationalityCode: string = ''
    fatherName: string = '';
    mobile: string = '';
    address: string = '';
    refereeName: string = '';
}

export class CustomerValidator extends Validator<Customer> {
    constructor(transloco: TranslocoService) {
        super();

        this.ruleFor('fullName').notEmpty().withMessage(transloco.translate('validation.notEmpty'));
        this.ruleFor('nationalityCode').notEmpty().withMessage(transloco.translate('validation.notEmpty'));
        this.ruleFor('fatherName').notEmpty().withMessage(transloco.translate('validation.notEmpty'));
        this.ruleFor('mobile').notEmpty().withMessage(transloco.translate('validation.notEmpty'));
        this.ruleFor('address').notEmpty().withMessage(transloco.translate('validation.notEmpty'));
    }
}