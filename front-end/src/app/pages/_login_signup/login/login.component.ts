import { Component, ViewChildren } from '@angular/core';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { UserManagerService } from '../../../services/user-manager.service';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { Login, LoginValidator } from '../../../models/login.model';
import { Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormInputComponent, TranslocoPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChildren('input') inputs: FormInputComponent[];

  constructor(
    public userManager: UserManagerService,
    private transLoco: TranslocoService,
    private titleService: Title,
    private metaService: Meta) {
    this.userManager.loginModel = new Login();
  }

  ngOnInit() {
    this.titleService.setTitle('Login - RSapp.ir');;
    this.metaService.updateTag({ name: 'description', content: 'Login into your account and manage your rental business. | RSapp.ir' });
  }

  onValueChanged(event: { value: any, labelName: string, valueType: string }) {
    console.log(event);

    let validation = new LoginValidator(this.transLoco);
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


  login() {

    let validation = new LoginValidator(this.transLoco);
    let errors = validation.validate(this.userManager.loginModel);

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
      this.userManager.login();
    }
  }
}
