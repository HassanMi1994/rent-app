import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../models/userSettingmodel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  config$: Observable<Config>
  config: Config;

  constructor(private client: HttpClient) {

  }

  get(): Observable<Config> {
    this.config$ = this.client.get<Config>('https://localhost:7053/api/config');
    this.config$.subscribe(x => this.config = x);
    return this.config$;
  }

  patch() {
    this.client.patch('https://localhost:7053/api/config', this.config);
  }
}
