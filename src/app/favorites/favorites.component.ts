import { HttpClient } from '@angular/common/http';
import { Component, OnInit,} from '@angular/core';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  championSearch:string = '';
  champions=[]
  dataDragonVersion:string;
  constructor(private champService: ChampsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchChampions()
    this.dataDragonVersion = this.champService.dataDragonVersion;
    this.champions=this.champService.favoriteChampions;
  }

  clickedChampion(favoriteChampion){
    this.champService.selectedChampion = favoriteChampion
  }
  removeFromFavorites(i){
    this.champions.splice(i, 1)

  }

  log(){
    console.log(this.champions)
    this.http.put('https://league-stat-checker-default-rtdb.firebaseio.com/favorites.json', this.champions).subscribe(
      res => {
        console.log(res)
      }
    )
  }
  fetchChampions(){
    this.http.get('https://league-stat-checker-default-rtdb.firebaseio.com/favorites.json').subscribe(
      (res:any) => {
        console.log(res)
        this.champService.favoriteChampions = this.champService.favoriteChampions.concat(res)
      }
    )
  }
}
