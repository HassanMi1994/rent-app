import { Component } from '@angular/core';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { UserManagerService } from '../../../services/user-manager.service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormInputComponent, TranslocoPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(public userManager: UserManagerService) {

  }

  login() {
    this.userManager.login();
  }
}
