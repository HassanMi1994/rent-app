import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, shareReplay, take, tap } from 'rxjs';
import { Config, UserConfig } from '../models/userSettingmodel';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private userConfigSubject$ = new BehaviorSubject<UserConfig | null>(null);
  public userConfig$: Observable<UserConfig | null> = this.userConfigSubject$.asObservable();
  public userConfig: UserConfig;

  constructor(private client: HttpClient) {
    console.warn('setting service constructor called!');
  }

  get(): Observable<UserConfig | null> {

    if (this.userConfigSubject$.value == null) {
      this.userConfig$ = this.client.get<UserConfig>(environment.baseUrl + 'config');
      this.userConfig$.pipe(
        tap(config=>{this.userConfigSubject$.next(config)}),
        shareReplay(1)
      );
    }

    return this.userConfig$;
  }

  patch(): Observable<UserConfig | null> {
    this.userConfig$ = this.client.patch<UserConfig>(environment.baseUrl + 'config', this.userConfig);
    this.userConfig$.subscribe(x => {
      if (x)
        this.userConfig = x
    });
    return this.userConfig$;
  }
}
