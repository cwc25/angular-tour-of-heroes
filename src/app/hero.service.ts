import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Rx'; 
// import { Observable } from 'rxjs/Observable';
// import {of} from 'rxjs/Observable/of';
@Injectable()
export class HeroService {

  constructor() { }

  getHeros(): Observable<Hero[]> {
    return Observable.of(HEROES);
  }

}
