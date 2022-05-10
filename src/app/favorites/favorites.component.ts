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
    this.champService.fetchChampionsFromFireBase().subscribe(
      (res:any) => {
        this.champService.favoriteChampions = res
        this.dataDragonVersion = this.champService.dataDragonVersion;
        this.champions = this.champService.favoriteChampions;
      }
    )
    // this.dataDragonVersion = this.champService.dataDragonVersion;
    // this.champions = this.champService.favoriteChampions;
  }

  clickedChampion(favoriteChampion){
    this.champService.selectedChampion = favoriteChampion
  }
  removeFromFavorites(i){
    this.champions.splice(i, 1)
    this.champService.addChampionsToFireBase().subscribe()
  }

  // log(){
  //   // console.log(this.champions)
  //   this.http.put('https://league-stat-checker-default-rtdb.firebaseio.com/favorites.json', this.champions).subscribe(
  //     res => {
  //       // console.log(res)
  //     }
  //   )
  // }
}
