import { AfterViewInit, Component, OnChanges, SimpleChanges, ViewChildren } from '@angular/core';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { UserManagerService } from '../../../services/user-manager.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp, SignUpValidation } from '../../../models/sign-up.model';
import { Validator } from 'fluentvalidation-ts';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormInputComponent, TranslocoPipe, NgSelectModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements AfterViewInit, OnChanges {

  @ViewChildren("inputs") inputs: FormInputComponent[];

  constructor(public userManager: UserManagerService,
    private router: Router,
    private transLoco: TranslocoService) {

  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngAfterViewInit(): void {
    this.userManager.signUpModel = new SignUp();
  }



  signUp() {
    let validation = new SignUpValidation(this.transLoco);
    let errors = validation.validate(this.userManager.signUpModel);

    let keys = Object.keys(errors);

    if (errors) {
      this.inputs.forEach(element => {
        if (keys.find(x => x == element.labelName)) {
          let key = element.labelName as keyof typeof errors;
          element.setInvalid(errors[key] as string)
        }
        else {
          element.setValid();
        }
      })
    }

    if (keys.length == 0) {
      this.userManager.signUp();
      this.router.navigateByUrl('/' + this.transLoco.getActiveLang() + '/login');
    }

  }

}
