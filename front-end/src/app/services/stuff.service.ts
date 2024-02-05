import { Injectable } from '@angular/core';
import { Stuff } from '../models/stuff.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import moduleName from 'module';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  constructor(private client: HttpClient) { }

  create(stuff: Stuff) {
    this.client.post('https://localhost:7053/api/stuff', stuff)
      .subscribe(x => {
        // this.notifier.notify('success', 'a new customer was added');
      });
  }

  getAll(): Observable<Stuff[]> {
    return this.client.get<Stuff[]>('https://localhost:7053/api/stuff');
  }

}