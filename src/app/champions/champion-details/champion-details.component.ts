import { Component, OnInit } from '@angular/core';
import { ChampsService } from 'src/app/champs.service';

@Component({
  selector: 'app-champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.css']
})
export class ChampionDetailsComponent implements OnInit {
  champions: string[]=[]
  constructor(private champService: ChampsService) {}

  addToFavorites(name){
    this.champService.favoriteChampions.push(name)
  }
  ngOnInit(): void {
    this.champions=this.champService.champions.sort().slice()
  }

}
