import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Login, UserInfo } from '../models/login.model';
import { SignUp } from '../models/sign-up.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  token: string;
  public userInfo: UserInfo = new UserInfo();
  public loginModel: Login = new Login();
  public signUpModel: SignUp = new SignUp();
  cookieService = inject(CookieService);
  ls: Storage | undefined;

  public users$: Observable<User[]>;
  public users: User[];
  public filterdUsers: User[];
  public newUser: User = new User();

  constructor(private client: HttpClient,
    private router: Router,
    private transLoco: TranslocoService,
    @Inject(DOCUMENT) document: Document
  ) {
    this.ls = document.defaultView?.localStorage;

    let ui = this.ls?.getItem('userInfo');
    if (ui) {
      let object: UserInfo = JSON.parse(ui);
      console.warn(object);
      this.userInfo = object;
    } else {
      this.userInfo = new UserInfo();
      this.userInfo.isLoggedIn = false;
    }
  }

  getUsers() {
    this.users$ = this.client.get<User[]>(environment.baseUrl + 'users');
    this.users$.subscribe(x => this.filterdUsers = this.users = x);
  }

  addNormalUser() {
    this.client.post(environment.baseUrl + 'users/add-user', this.newUser)
      .subscribe(x => {
        this.newUser = new User();
        this.getUsers();
      });
  }

  login() {
    console.log(this.loginModel);
    this.client.post<UserInfo>(environment.baseUrl + 'users/login', this.loginModel)
      .subscribe((x: UserInfo) => {
        this.token = x.jwtKey;
        x.isLoggedIn = true;
        this.ls?.setItem("userInfo", JSON.stringify(x));
        this.userInfo = x;
        this.userInfo.isLoggedIn = true;
        this.router.navigateByUrl('/' + this.transLoco.getActiveLang() + '/contracts')
      });
  }

  logOut() {
    console.log(this.loginModel);
    this.userInfo = new UserInfo();
    this.cookieService.deleteAll();
    this.ls?.removeItem('userInfo');
    this.users = this.filterdUsers = [];
    this.router.navigateByUrl('/');
  }

  signUp() {
    this.client.post(environment.baseUrl + 'users/sign-up', this.signUpModel)
      .subscribe(x => {
        //todo: show pop up to show that sign up was successful and redirect user
      })
  }

  //#region search
  private _searchTerm: string = '';
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    if (value !== this._searchTerm) {
      this._searchTerm = value;
      this.filterdUsers = this.users.filter(x => x.fullName.includes(this.searchTerm));
    }
  }

  //#endregion
}
