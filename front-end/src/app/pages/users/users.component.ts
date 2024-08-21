import { Component, ViewChild } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { UserManagementService } from '@piwikpro/ngx-piwik-pro';
import { FormInputComponent } from '../../utils/form-input/form-input.component';
import { PopUpComponent } from '../../utils/pop-up/pop-up.component';
import { RouterLink } from '@angular/router';
import { UserManagerService } from '../../services/user-manager.service';
import { User } from '../../models/user.model';
import { Router } from 'express';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TranslocoPipe, FormInputComponent, PopUpComponent, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  @ViewChild('popUp') child: PopUpComponent;

  constructor(public ums: UserManagerService) {
    ums.getUsers();
  }

  showMoreInfo(e: MouseEvent, stuffId: number) {
    var selectedUser = this.ums.users.find(x => x.id == stuffId) as User;
    this.child.setTitle(selectedUser?.fullName)
    this.child.showObject(selectedUser);
    this.child.show({ x: e.clientX, y: e.clientY });
    let popUp = document.getElementById('morePopUp') as HTMLDivElement
    popUp.style.top = e.y + 'px'
    popUp.style.left = e.x + 'px'
  }

}
