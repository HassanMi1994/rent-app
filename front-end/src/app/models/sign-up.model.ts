import { Validator } from "fluentvalidation-ts";
import { never } from "rxjs";

export class SignUp {
    email: string;
    fullName: string;
    storeName: string;
    serviceType: number = 1;
    mobile: string;
    password: string;
    confirmPasswrod: string;
}

export class SignUpValidation extends Validator<SignUp> {
    constructor() {
        super();

        this.ruleFor('email')
            .emailAddress();

        this.ruleFor('fullName')
            .notEmpty();

        this.ruleFor('password')
            .minLength(6);

        this.ruleFor('confirmPasswrod')
            .minLength(6);
    }
}