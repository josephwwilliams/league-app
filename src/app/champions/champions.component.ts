import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {
@Output() selectedChampion = new EventEmitter<string>();
  champions: string[]=[]

  champInfo(champ) {
    this.selectedChampion.emit(champ)
  }
  constructor(private champService: ChampsService) { }

  ngOnInit(): void {
    this.champions=this.champService.champions.sort().slice()
  }


}
