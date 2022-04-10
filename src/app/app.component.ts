import { Component, OnInit } from '@angular/core';
import { ChampsService } from './champs.service';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'league-app';
  locationSelected:string = 'home'
  champions: string[]=[]
  constructor(private champService: ChampsService){};

  location($event: string){
    this.locationSelected = $event
  }
  champSelect(){
    this.locationSelected = 'Champ Selected'
  }
  ngOnInit(): void {
    this.champions=this.champService.favoriteChampions.sort().slice()
  }

}
