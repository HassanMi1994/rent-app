import { TranslocoService } from "@ngneat/transloco";
import { RuleValidators, ValidationErrors, Validator } from "fluentvalidation-ts";

export class Stuff {
    id: number;
    name: string = '';
    description: string = '';
    quantity: number;
    pricePerDay: number
}

export class StuffValidator extends Validator<Stuff> {
    constructor(transloco: TranslocoService) {
        super();

        this.ruleFor('name').notEmpty().withMessage(transloco.translate('validation.notEmpty'));
        this.ruleFor('pricePerDay').greaterThan(0).notNull().withMessage(transloco.translate('validation.greaterThanZero'));
        this.ruleFor('quantity').greaterThan(0).notNull().withMessage(transloco.translate('validation.greaterThanZero'));
    }
}