import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Rx'; 
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import {of} from 'rxjs/Observable/of';
@Injectable()
export class HeroService {

  constructor(private messageService: MessageService,
              private http: HttpClient ) { }
  private heroesUrl = "api/heroes";

  getHeros(): Observable<Hero[]> {
    this.log("Hero Service: fetch rows");
    return this.http.get<Hero[]>(this.heroesUrl);
  }
  getHeroById(id:number): Observable<Hero>{
    this.log(`HeroService: fetched hero id=${id}`);
    return Observable.of(HEROES.find(hero=>hero.id ===id));
  }
  log(message:string){
    this.messageService.addMessage(message);
  }

}
