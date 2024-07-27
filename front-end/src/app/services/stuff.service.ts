import { Injectable } from '@angular/core';
import { Stuff } from '../models/stuff.model';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  public stuff$: Observable<Stuff[]>;
  public stuff: Stuff[];
  public filterdStuff: Stuff[];

  constructor(private client: HttpClient) { }

  create(stuff: Stuff) {
    this.client.post(environment.baseUrl + 'stuff', stuff)
      .subscribe(x => {
        this.stuff = this.filterdStuff = [stuff, ...this.stuff];
        // this.notifier.notify('success', 'a new customer was added');
      });
  }

  getStuff(): Observable<Stuff[]> {
    this.stuff$ = this.client.get<Stuff[]>(environment.baseUrl + 'stuff');
    this.stuff$.subscribe(x => this.stuff = this.filterdStuff = x);
    return this.stuff$;
  }

  private _searchTerm: string = '';
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    if (value !== this._searchTerm) {
      this._searchTerm = value;
      this.filterdStuff = this.stuff.filter(x => x.name.includes(this.searchTerm));
    }
  }
}