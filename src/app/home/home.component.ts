import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ChampsService } from '../champs.service';
import { ChampionService } from '../shared/champion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  favoriteChampions = [];
  loggedIn = false;
  value = 100;
  results = 10;
  newNames = [];
  names: any[];
  dataDragonVersion: string;

  data = [];
  data2;

  selectedValue: string;
  regions: { value: string; viewValue: string }[] = [];

  constructor(
    private champService: ChampsService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private championService: ChampionService
  ) {}
  ngOnInit(): void {
    // this.champService.getDDVersion().subscribe(
    //   (res) => {
    //     this.dataDragonVersion = res[0];
    //     this.champService.dataDragonVersion = res[0];
    //   }
    // );
    this.userSub = this.authService.user.subscribe((user) => {
      this.loggedIn = !!user;
      if (this.loggedIn) {
        this.champService.fetchUserDataFromFireBase().subscribe((res: any) => {
          if (res !== null) {
            this.regions = this.champService.regions;
            this.selectedValue = res.region[0];
            this.printUsers(res.region[0]);
          }
        });
        this.champService.fetchChampionsFromFireBase().subscribe((res: any) => {
          if (res === null || res[0] === 0) {
            this.champService.favoriteChampions = [];
            this.favoriteChampions = [];
          } else {
            this.champService.favoriteChampions = res;
            this.favoriteChampions = res;
          }
        });
      }
    });
    this.dataDragonVersion = this.champService.dataDragonVersion;
  }

  log() {
    this.champService.returnItems().subscribe((res: any) => {
      this.data = res.data;
    });
    this.champService.returnRunes().subscribe((res) => {
      this.data2 = res;
    });
  }

  signingUp(form: NgForm) {
    const value = form.value;
    this.champService.name = value.username;
  }

  printUsers(region: string) {
    this.champService.regionCheckAndChange(region);
    this.champService
      .getTopTenPlayersInRegion(this.selectedValue)
      .subscribe((data) => {
        this.names = data.entries.sort((a, b) =>
          a.leaguePoints > b.leaguePoints ? -1 : 1
        );
        let newNames = [];
        for (let i = 0; i < this.results; i++) {
          this.champService
            .getSummonerWithSummonerID(
              this.selectedValue,
              this.names[i].summonerId
            )
            .subscribe((data) => {
              newNames.push(data);
            });
        }
        this.newNames = newNames;
      });
  }

  playerClick(playerName) {
    this.champService.name = playerName;
    this.router.navigate([`stats`]);
  }

  clickedChampion(favoriteChampion) {
    this.champService.selectedChampion = favoriteChampion;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  // getData() {
  //   return this.http.get<any>(
  //     'https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/ivpVjtN7hydy1MScdnNpme0ECM-vfpIdTB_jMJf0BpO9AZRy?api_key=RGAPI-c87cccca-e7c4-41f7-98d8-9f98cb91ea8d'
  //   );
  // }

  log2() {
    // this.getData().subscribe((res) => {
    //   console.log('hi');
    //   console.log(res);
    // });
    // console.log(this.championService.getChampionNameWithID(19));
  }
}
