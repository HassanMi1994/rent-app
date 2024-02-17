import { Injectable } from '@angular/core';
import { Stuff } from '../models/stuff.model';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  public stuff$: Observable<Stuff[]>;
  public stuff: Stuff[];

  constructor(private client: HttpClient) { }

  create(stuff: Stuff) {
    this.client.post('https://localhost:7053/api/stuff', stuff)
      .subscribe(x => {
        this.stuff = [stuff, ...this.stuff];
        // this.notifier.notify('success', 'a new customer was added');
      });
  }

  getStuff(): Observable<Stuff[]> {
    this.stuff$ = this.client.get<Stuff[]>('https://localhost:7053/api/stuff');
    this.stuff$.subscribe(x => this.stuff = x);
    return this.stuff$;
  }
}