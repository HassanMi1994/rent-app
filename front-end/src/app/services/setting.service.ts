import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config, UserConfig } from '../models/userSettingmodel';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public userConfig$: Observable<UserConfig>
  public userConfig: UserConfig;

  constructor(private client: HttpClient) {
  }

  get(): Observable<UserConfig> {
    this.userConfig$ = this.client.get<UserConfig>(environment.baseUrl + 'config');
    this.userConfig$.subscribe(x =>
      this.userConfig = x);
    return this.userConfig$;
  }

  patch(): Observable<UserConfig> {
    this.userConfig$ = this.client.patch<UserConfig>(environment.baseUrl + 'config', this.userConfig);
    this.userConfig$.subscribe(x => this.userConfig = x);
    return this.userConfig$;
  }
}
