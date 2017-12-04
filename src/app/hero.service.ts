import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Rx'; 
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
// import {of} from 'rxjs/Observable/of';
@Injectable()
export class HeroService {

  constructor(private messageService: MessageService,
              private http: HttpClient ) { }
  private heroesUrl = "api/heroes";

  getHeros(): Observable<Hero[]> {
    this.log("Hero Service: fetch rows");
    return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(tap(heroes=>this.log("fetched rows")),
                      catchError(this.handleError('getHeroes',[])));
  }
  getHeroById(id:number): Observable<Hero>{
    this.log(`HeroService: fetched hero id=${id}`);
    return Observable.of(HEROES.find(hero=>hero.id ===id));
  }
  log(message:string){
    this.messageService.addMessage(message);
  }
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
