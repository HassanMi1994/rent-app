import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { UserManagerService } from '../../../services/user-manager.service';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [TranslocoPipe, FormInputComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  constructor(private router: Router, public userManager: UserManagerService, private transLoco: TranslocoService) {

  }


  create() {
    this.userManager.addNormalUser();
    this.router.navigateByUrl('/' + this.transLoco.getActiveLang() + '/users');
  }
}
