import { Component } from '@angular/core';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { UserManagerService } from '../../../services/user-manager.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormInputComponent, TranslocoPipe, NgSelectModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  constructor(public userManager: UserManagerService, private router: Router, private transLoco: TranslocoService) {

  }

  signUp() {
    this.userManager.signUp();
    this.router.navigateByUrl('/' + this.transLoco.getActiveLang() + '/login');
  }

}
