import { Validator } from "fluentvalidation-ts";
import { translate, TranslocoService } from "@ngneat/transloco";

export class Login {
    email: string='';
    password: string='';
}

export class LoginValidator extends Validator<Login> {
    constructor(transloco: TranslocoService) {
        super();

        this.ruleFor('email')
            .emailAddress()
            .withMessage(transloco.translate('validation.email'));

        this.ruleFor('password')
            .notEmpty()
            .withMessage(transloco.translate('validation.notEmpty'))
    }
}

export class UserInfo {
    isLoggedIn: boolean = false;
    fullName: string;
    jwtKey: string;
    storeName: string;
    userID: number;
    storeID: number;
    email: string;
    isAdmin: boolean;
}