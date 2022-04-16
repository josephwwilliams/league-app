import { Component, OnInit } from '@angular/core';
import { ChampsService } from 'src/app/champs.service';

@Component({
  selector: 'app-champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.css']
})
export class ChampionDetailsComponent implements OnInit {
  favChampion;
  champDetails:any = []
  constructor(private champService: ChampsService) {}
  champId
  showLore = false

  sendToFavorites(){
    this.champService.favoriteClick(this.favChampion)
  }
  ngOnInit(): void {
    this.favChampion = this.champService.selectedChampion
    this.champId = this.favChampion.id
    this.champService.getChampionData(this.favChampion.id).subscribe(
      res => this.champDetails.push(res.data[this.champId])
      // res => console.log(res.data[this.champId])
    );
  }

}
