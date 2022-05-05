import { Component, OnInit,} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  championSearch:string = '';
  champions=[]
  constructor(private champService: ChampsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.champions=this.champService.favoriteChampions
  }

  clickedChampion(favoriteChampion){
    this.champService.selectedChampion = favoriteChampion
  }
  removeFromFavorites(i){
    this.champions.splice(i, 1)

  }
}
