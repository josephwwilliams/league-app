import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChampsService } from 'src/app/champs.service';

@Component({
  selector: 'app-champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.css']
})
export class ChampionDetailsComponent implements OnInit {
  favChampion;
  champDetails;
  constructor(private champService: ChampsService, private http: HttpClient) {}


  sendToFavorites(){
    this.champService.favoriteClick(this.favChampion)
  }
  // getData(){
  //   this.champService.getChampionData(this.favChampion).subscribe(
  //     res=> this.champDetails = res
  //   );
  //   console.log(this.champDetails)
  // }

  ngOnInit(): void {
    this.favChampion = this.champService.selectedChampion
    // this.champService.getChampionData(this.favChampion).subscribe(
    //   res=> this.champDetails = res.data
    // );
  }
}
