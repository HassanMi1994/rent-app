import { AfterViewInit, Component, OnChanges, SimpleChanges, ViewChildren } from '@angular/core';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { UserManagerService } from '../../../services/user-manager.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp, SignUpValidation } from '../../../models/sign-up.model';
import { Validator } from 'fluentvalidation-ts';
import { Meta, Title } from '@angular/platform-browser';

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
    private transLoco: TranslocoService,
    private titleService: Title,
    private metaService: Meta) {

  }

  ngOnInit() {
    this.titleService.setTitle('Sign-Up - RSapp.ir');;
    this.metaService.updateTag({ name: 'description', content: 'Register you store at our website in less than a min, and manage you rental business as easy as possible | RSapp.ir' });
  }
  
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngAfterViewInit(): void {
    this.userManager.signUpModel = new SignUp();
  }

  // onValueChagned(event: { value: any, labelName: string, valueType: string }) {
  //   console.log(event);

  //   let validation = new SignUpValidation(this.transLoco);
  //   let errors = validation.validate(this.userManager.signUpModel);
  //   let key = event.labelName as keyof typeof errors;

  //   if (errors) {
  //     this.inputs.forEach(element => {
  //       if (event.labelName == element.labelName) {
  //         if (errors[key] !== undefined) {
  //           element.setInvalid(errors[key] as string)
  //         }

  //       }
  //       else {
  //         element.setValid();
  //       }
  //     })
  //   }
  // }

  onValueChanged(event: { value: any, labelName: string, valueType: string }) {
    console.log(event);

    let validation = new SignUpValidation(this.transLoco);
    let errors = validation.validate(this.userManager.signUpModel);
    let key = event.labelName as keyof typeof errors;

    if (errors && typeof errors === 'object') {
      this.inputs.forEach(element => {
        if (errors[element.labelName as keyof typeof errors] !== undefined) {
          element.setInvalid(errors[element.labelName as keyof typeof errors] as string);
        } else {
          element.setValid();
        }
      });
    }
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
