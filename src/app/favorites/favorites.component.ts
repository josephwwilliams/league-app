import { Component, OnInit } from '@angular/core';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  champions:string[] =[]
  constructor(private champService: ChampsService) {}

  ngOnInit(): void {
    this.champions=this.champService.favoriteChampions.sort().slice()
  }

}
