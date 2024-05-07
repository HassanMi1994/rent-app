import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Login, UserInfo } from '../models/login.model';
import { SignUp } from '../models/sign-up.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  token: string;
  public userInfo: UserInfo = new UserInfo();
  public loginModel: Login = new Login();
  public signUpModel: SignUp = new SignUp();
  cookieService = inject(CookieService);

  constructor(private client: HttpClient, private router: Router, private transLoco: TranslocoService) {

  }

  login() {
    console.log(this.loginModel);
    this.client.post<UserInfo>('https://localhost:7053/api/users/login', this.loginModel)
      .subscribe((x: UserInfo) => {
        this.token = x.jwtKey;
        this.cookieService.set('jwt-token', 'bearer ' + x.jwtKey);
        this.userInfo = x;
        this.userInfo.isLoggedIn = true;
        console.log(this.userInfo);
        this.router.navigateByUrl('/' + this.transLoco.getActiveLang() + '/contracts')
      });
  }

  logOut() {
    console.log(this.loginModel);
    this.userInfo = new UserInfo();
    this.cookieService.set('jwt-token', '');
    this.router.navigateByUrl('/');
  }



  signUp() {
    this.client.post('https://localhost:7053/api/users/sign-up', this.signUpModel)
      .subscribe(x => {
        //todo: show pop up to show that sign up was successful and redirect user
      })
  }
}
