import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { SignUp } from '../models/sign-up.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  token: string;
  public loginModel: Login = new Login();
  public signUpModel: SignUp = new SignUp();

  constructor(private client: HttpClient) {

  }

  login() {
    this.client.post('https://localhost:7053/api/users/login', this.login)
      .subscribe((x) => this.token = x as string)
  }

  signUp() {
    this.client.post('https://localhost:7053/api/users/sign-up', this.signUpModel)
      .subscribe(x => {
        //todo: show pop up to show that sign up was successful and redirect user
      })
  }
}
