import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import { HeroService } from '../hero.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  
  hero: Hero;
  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroById(id).subscribe(
        re=>this.hero = re);
  }
  goBack(): void{
    this.location.back();
  }

}
