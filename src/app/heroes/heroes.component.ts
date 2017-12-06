import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:Hero[];
  selectedHero: Hero;
 
  constructor(private heroSerivce:HeroService, 
              private messageService:MessageService) {
    
   }  

  ngOnInit() {
    this.getHeros();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.addMessage("selected ${hero.name}");
  }
  getHeros():void{
    this.heroSerivce.getHeros()
    .subscribe(res =>this.heroes= res);
  }
  addHero(name1:string){
    this.heroSerivce.addHero({name: name1} as Hero)
                    .subscribe(hero=>this.heroes.push(hero));
  }
  deleteHero(hero:Hero):void{
    this.heroes = this.heroes.filter(h=>h.id !== hero.id);
    this.heroSerivce.deleteHero(hero).subscribe();
  }
}
