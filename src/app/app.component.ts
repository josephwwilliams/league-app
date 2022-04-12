import { Component, OnInit } from '@angular/core';
import { Champion } from './champion-format.model';
import { ChampsService } from './champs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'league-app';

  champions: Champion[]=[]
  constructor(private champService: ChampsService){};

  ngOnInit(): void {
    this.champions=this.champService.favoriteChampions
  }
}
