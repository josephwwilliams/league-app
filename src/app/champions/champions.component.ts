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
  log(){
    console.log('im the second array')
  }
  log2(){
    console.log('im the first array')
  }

  // favortiteFilter() {
  //   this.champions = this.champions.map(obj => this.favoriteChamps.find(o => o.id === obj.value.id) || obj)
  // }

}
