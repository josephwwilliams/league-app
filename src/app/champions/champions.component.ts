import { Component, OnInit } from '@angular/core';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {
  champions:any = []
  favoriteChamps=[]
  displayArray=[]
  // logs = true
  championSearch:string = '';

  constructor(private champService: ChampsService) { }

  ngOnInit(): void {
    this.champService.getData().subscribe(
      res=> this.champions = res.data
    );
    this.favoriteChamps = this.champService.favoriteChampions.slice()
  }

  clickedChampion(champion){
    this.champService.selectedChampion = champion.value
  }

  createArray(){
    this.displayArray=this.champions
    // let resut = Object.values(this.displayArray).filter(o1 => this.champService.favoriteChampions.some(o2 => o1.id === o2.id))
    // this.displayArray.push(resut)
  }

}
