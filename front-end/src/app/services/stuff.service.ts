import { Injectable } from '@angular/core';
import { Stuff } from '../models/stuff.model';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  public stuff: Observable<Stuff[]>;

  constructor(private client: HttpClient) { }

  create(stuff: Stuff) {
    this.client.post('https://localhost:7053/api/stuff', stuff)
      .subscribe(x => {
        this.stuff.pipe(tap(x => x.push(stuff)))
        // this.notifier.notify('success', 'a new customer was added');
      });
  }

  getAll(): Observable<Stuff[]> {
    this.stuff = this.client.get<Stuff[]>('https://localhost:7053/api/stuff');
    return this.stuff;
  }
}