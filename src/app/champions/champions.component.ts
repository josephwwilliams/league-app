import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private champService: ChampsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.champService.getAllChampions().subscribe(
      res=> {
        this.champions = res.data;
      }
    );
    this.favoriteChamps = this.champService.favoriteChampions.slice()
  }

  clickedChampion(champion){
    this.champService.selectedChampion = champion.value
    this.router.navigate([`details/${champion.value.id}`], {relativeTo: this.route})
  }

  createArray(){
    // this.displayArray=this.champions
    // let resut = Object.values(this.displayArray).filter(o1 => this.champService.favoriteChampions.some(o2 => o1.id === o2.id))
    // this.displayArray.push(resut)
  }

}
