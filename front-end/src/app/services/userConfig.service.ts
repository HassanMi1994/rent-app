import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config, UserConfig } from '../models/userSettingmodel';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public userConfig$: Observable<UserConfig>
  public userConfig: UserConfig;

  constructor(private client: HttpClient) {
  }

  get(): Observable<UserConfig> {
    this.userConfig$ = this.client.get<UserConfig>('https://localhost:7053/api/config');
    this.userConfig$.subscribe(x =>
      this.userConfig = x);
    return this.userConfig$;
  }

  patch() {
    this.client.patch('https://localhost:7053/api/config', this.userConfig);
  }
}
