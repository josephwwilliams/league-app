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
      this.showSpinner = true;
      if (res === null) {
        this.champions = [];
        this.showSpinner = false;
        return;
      }
      this.champService.favoriteChampions = res;
      this.dataDragonVersion = this.champService.dataDragonVersion;
      this.champions = this.champService.favoriteChampions;
      this.showSpinner = false;
    });
    // this.dataDragonVersion = this.champService.dataDragonVersion;
    // this.champions = this.champService.favoriteChampions;
  }

  clickedChampion(favoriteChampion) {
    this.champService.selectedChampion = favoriteChampion;
  }
  removeFromFavorites(i) {
    this.champions.splice(i, 1);
    this.champService.addChampionsToFireBase().subscribe();
  }
}
