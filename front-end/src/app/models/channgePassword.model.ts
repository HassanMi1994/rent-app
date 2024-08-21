import { TranslocoService } from "@ngneat/transloco";
import { Validator } from "fluentvalidation-ts";

export class ChangePassword {
    oldPassword: string = ''
    newPassword: string = ''
    confirmNewPassword: string = ''
}

export class ChangePasswordValidator extends Validator<ChangePassword> {
    constructor(transloco: TranslocoService) {
        super();

        this.ruleFor('oldPassword')
            .emailAddress()
            .withMessage(transloco.translate('validation.notEmpty'));

        this.ruleFor('newPassword')
            .notEmpty()
            .withMessage(transloco.translate('validation.atLeast6'))

        this.ruleFor('confirmNewPassword')
            .notEmpty()
            .withMessage(transloco.translate('validation.atLeast6'))
    }
}


