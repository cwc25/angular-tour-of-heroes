import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Rx'; 
import {MessageService} from './message.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators';
import { headersToString } from 'selenium-webdriver/http';
import { ObserveOnMessage } from 'rxjs/operators/observeOn';
// import { Observable } from 'rxjs/Observable';
// import {of} from 'rxjs/Observable/of';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class HeroService {

  constructor(private messageService: MessageService,
              private http: HttpClient ) { }
  private heroesUrl = "api/heroes";

  getHeros(): Observable<Hero[]> {
    this.log("Hero Service: fetch rows");
    console.log('here');
    return this.http.get<Hero[]>(this.heroesUrl)
                    .pipe(tap(heroes=>this.log("fetched rows")),
                      catchError(this.handleError('getHeroes',[])));
  }
  getHeroById(id:number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

    /** PUT: update the hero on the server */
    updateHero (hero: Hero): Observable<any> {
      console.log('update');
      return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
        tap(x => console.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }
  addHero(hero:Hero): Observable<any>{
    console.log('add');
    return this.http.post(this.heroesUrl, hero, httpOptions)
                    .pipe(catchError(this.handleError<any>('addHero')));
  }
   /** DELETE: delete the hero from the server */
   deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  /* deleteHero(hero:Hero): Observable<any>{
    console.log(`delete ${hero.id}`);
    const url = `${this.heroesUrl}/${hero.id}`;   
    console.log(url);
    return this.http.delete(url)
                    .pipe(catchError(this.handleError<any>('deleteHero')));
  } */
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
