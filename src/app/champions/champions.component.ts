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
  }

  // favortiteFilter() {
  //   this.champions = this.champions.map(obj => this.favoriteChamps.find(o => o.id === obj.value.id) || obj)
  // }

}
