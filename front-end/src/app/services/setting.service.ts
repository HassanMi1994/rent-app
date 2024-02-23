import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setting } from '../models/setting.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  setting$: Observable<Setting>
  setting: Setting;

  constructor(private client: HttpClient) {

  }

  get(): Observable<Setting> {
    this.setting$ = this.client.get<Setting>('https://localhost:7053/api/settings');
    this.setting$.subscribe(x => this.setting = x);
    return this.setting$;
  }

  patch() {
    this.client.patch('https://localhost:7053/api/settings', this.setting);
  }
}
