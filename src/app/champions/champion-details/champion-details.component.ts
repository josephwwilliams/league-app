import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChampsService } from 'src/app/champs.service';
import { ChampionDialogComponent } from './champion-dialog/champion-dialog.component';

@Component({
  selector: 'app-champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.css']
})
export class ChampionDetailsComponent implements OnInit {
  selectedChampion;
  champDetails:any = []
  constructor(private champService: ChampsService, private dialog: MatDialog) {}

  autoTicks = false;
  invert = false;
  max;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = false;
  value = 0;
  disabled = true
  vertical = false;
  tickInterval = 1;
  sendToFavorites(){
    this.champService.favoriteClick(this.selectedChampion)
  }

  ngOnInit(): void {
    this.selectedChampion = this.champService.selectedChampion
    this.champService.getChampionData(this.selectedChampion.id).subscribe(
      res => {
        this.value = 0
        this.champDetails.push(res.data[this.selectedChampion.id]);
        this.max =  this.champDetails[0].skins.length - 1
      }
    );
  }

  goRight(){
    if(this.value !== this.champDetails[0].skins.length - 1) {
      this.value = this.value + 1
    }
  }
  goLeft(){
    if(this.value !== 0) {
      this.value = this.value - 1
    }
  }
  spellClick(info){
    this.dialog.open(ChampionDialogComponent, {data: {info}})
  }

}
