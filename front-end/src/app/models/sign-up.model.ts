import { TranslocoService } from "@ngneat/transloco";
import { Validator } from "fluentvalidation-ts";
import { never } from "rxjs";

export class SignUp {
    email: string = "";
    fullName: string = "";
    storeName: string = "";
    serviceType: number = 1;
    mobile: string = "";
    password: string = "";
    confirmPassword: string = "";
}


interface IVAlidate {
    validate(): boolean;
}

export class SignUpValidation extends Validator<SignUp> {
    constructor(transloco: TranslocoService) {
        super();

        this.ruleFor('email')
            .emailAddress()
            .withMessage(transloco.translate('validation.email'));

        this.ruleFor('fullName')
            .notEmpty()
            .withMessage(transloco.translate('validation.notEmpty'));

            this.ruleFor("storeName")
                .notEmpty()
                .withMessage(transloco.translate('validation.notEmpty'));

                this.ruleFor('mobile')
                .minLength(11)
                .withMessage(transloco.translate('validation.mobile'))
                .maxLength(15)
                .withMessage(transloco.translate('validation.mobile'))

                
        this.ruleFor('password')
            .minLength(6)
            .withMessage(transloco.translate('validation.atLeast6'));

        this.ruleFor('confirmPassword')
            .minLength(6)
            .withMessage(transloco.translate('validation.atLeast6'));


    }


}