import { Component, OnInit } from '@angular/core';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {
  champions: string[]=[]
  constructor(private champService: ChampsService) { }

  ngOnInit(): void {
    this.champions=this.champService.champions.slice()
  }

}
