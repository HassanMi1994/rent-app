import { Validator } from "fluentvalidation-ts";
import { never } from "rxjs";

export class SignUp {
    email: string;
    storeName: string;
    serviceType: string;
    mobile: string;
    password: string;
    confirmPasswrod: string;
}

export class SignUpValidation extends Validator<SignUp> {
    constructor() {
        super();

        this.ruleFor('email')
            .emailAddress();

        this.ruleFor('password')
            .minLength(6);

        this.ruleFor('confirmPasswrod')
            .minLength(6);
    }
}