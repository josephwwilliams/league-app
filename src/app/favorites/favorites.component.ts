import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  championSearch: string = '';
  champions = [];
  dataDragonVersion: string;
  showSpinner = false;
  constructor(private champService: ChampsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.champService.fetchChampionsFromFireBase().subscribe((res: any) => {
      console.log(res);
      this.showSpinner = true;
      if (res === null || res[0] === 0) {
        this.champions = [];
        this.showSpinner = false;
        return;
      }
      console.log(res);
      this.champService.favoriteChampions = res;
      this.dataDragonVersion = this.champService.dataDragonVersion;
      this.champions = this.champService.favoriteChampions;
      this.showSpinner = false;
    });
  }

  clickedChampion(favoriteChampion) {
    this.champService.selectedChampion = favoriteChampion;
  }
  removeFromFavorites(i) {
    this.champions.splice(i, 1);
    this.champService.addChampionsToFireBase().subscribe();
  }
}
