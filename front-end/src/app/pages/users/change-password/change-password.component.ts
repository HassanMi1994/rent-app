import { Component, input, ViewChildren } from '@angular/core';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { UserManagerService } from '../../../services/user-manager.service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormInputComponent, TranslocoPipe],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  @ViewChildren('input') inputs: FormInputComponent[]

  constructor(public userManager: UserManagerService) {

  }

  changePass() {
    //vlaidate user inputs
    this.userManager.changePassword();
  }

  onValueChagned(event: { value: any, labelName: string, valueType: string }) {
    console.log(event);
  }

}
