import { Component } from '@angular/core';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
