import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Rx'; 
import {MessageService} from './message.service';
// import { Observable } from 'rxjs/Observable';
// import {of} from 'rxjs/Observable/of';
@Injectable()
export class HeroService {

  constructor(private messageService: MessageService ) { }

  getHeros(): Observable<Hero[]> {
    this.messageService.addMessage("Hero Service: fetch rows");
    return Observable.of(HEROES);
  }
  getHeroById(id:number): Observable<Hero>{
    this.messageService.addMessage(`HeroService: fetched hero id=${id}`);
    return Observable.of(HEROES.find(hero=>hero.id ===id));
  }

}
