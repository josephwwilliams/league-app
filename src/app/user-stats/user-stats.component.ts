import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ChampsService } from '../champs.service';
import { PlayerStatsComponent } from './player-stats/player-stats.component';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css'],
})
export class UserStatsComponent implements OnInit {
  constructor(
    private champService: ChampsService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  inGame: boolean = false;
  autoSearch = false;
  dataDragonVersion: string;
  showSpinner = false;
  details;
  name = '';
  players = [];
  playerStats: any;
  errors: any;
  mostPlayedChampions = [];
  currentGame;

  selectedValue: string;
  regions: { value: string; viewValue: string }[] = [];

  ngOnInit(): void {
    this.champService.fetchUserDataFromFireBase().subscribe((res: any) => {
      this.champService.animations = res.animations[0];
      this.autoSearch = res.autoSearch[0];
      if (this.name !== '' && this.autoSearch) {
        this.submit();
      }
    });
    this.name = this.champService.name;
    if (this.name === '') {
      this.champService.fetchUserDataFromFireBase().subscribe((res: any) => {
        this.autoSearch = res.autoSearch[0];
        this.name = res.username[0];
        this.champService.regionCheckAndChange(res.region[0]);
        this.selectedValue = this.champService.region;
        if (this.name === res.username[0] && this.autoSearch) {
          this.submit();
        }
      });
    }
    this.dataDragonVersion = this.champService.dataDragonVersion;
    this.regions = this.champService.regions;
    this.selectedValue = this.champService.region;
    // this.name = this.champService.name;
  }

  submit() {
    if (this.showSpinner === false) {
      this.clear();
      this.champService
        .getSummonerByName(this.champService.region, this.name)
        .subscribe(
          (res) => {
            this.details = res;
            this.champService
              .getMatchesByPUUID(
                this.champService.massRegion,
                this.details.puuid
              )
              .subscribe(
                (res) => {
                  forkJoin(
                    res.map((match: any) =>
                      this.champService.getChampsByMatch(
                        this.champService.massRegion,
                        match
                      )
                    )
                  ).subscribe(
                    (res: any) => {
                      res.forEach((data, i) => {
                        this.players.push(data.info.participants);
                        this.players[i]['gameCreation'] =
                          data.info.gameCreation;
                        this.players.sort((a, b) =>
                          a.gameCreation > b.gameCreation ? -1 : 1
                        );
                      });
                      this.champService
                        .getPlayerStatsWithSummonerID(
                          this.champService.region,
                          this.details.id
                        )
                        .subscribe(
                          (res) => {
                            for (let i = 0; i < res.length; i++) {
                              if (res[i].queueType === 'RANKED_SOLO_5x5') {
                                this.playerStats = res[i];
                              }
                            }
                            this.champService
                              .getMostPlayedChampions(
                                this.champService.region,
                                this.details.id
                              )
                              .subscribe(
                                (res: any) => {
                                  this.mostPlayedChampions = res;
                                  this.mostPlayedChampions
                                    .slice(0, 10)
                                    .forEach((a, index) => {
                                      this.champService
                                        .getChampionNameWithID(a.championId)
                                        .subscribe((res) => {
                                          Object.values(res.data).forEach(
                                            (i: any) => {
                                              if (+i.key === a.championId) {
                                                this.mostPlayedChampions[index][
                                                  'championName'
                                                ] = i.id;
                                              }
                                            }
                                          );
                                        });
                                    });
                                  this.champService
                                    .checkIfPlayerIsInGame(
                                      this.champService.region,
                                      this.details.id
                                    )
                                    .subscribe(
                                      (res: any) => {
                                        this.inGame = true;
                                        console.log(res);
                                        this.currentGame = res;
                                        this.showSpinner = false;
                                      },
                                      (err) => {
                                        this.inGame = true;
                                        this.showSpinner = false;
                                      }
                                    );
                                },
                                (err) => {
                                  this.errors = err;
                                  this.showSpinner = false;
                                }
                              );
                          },
                          (err) => {
                            this.errors = err;
                            this.showSpinner = false;
                          }
                        );
                    },
                    (err) => {
                      this.errors = err;
                      this.showSpinner = false;
                    }
                  );
                },
                (err) => {
                  this.errors = err;
                  this.showSpinner = false;
                }
              );
          },
          (err) => {
            this.errors = err;
            this.showSpinner = false;
          }
        );
      // this.champService.name = this.name;
    } else alert('Please Wait');
  }

  checkPlayerStatsInGame(player) {
    console.log(player);
    this.dialog.open(PlayerStatsComponent, { data: { player } });
  }

  playerClick(playerName: string) {
    this.champService.name = playerName;
    this.name = playerName;
    this.submit();
  }

  championClick(champion: any) {
    this.champService.selectedChampion = {
      id: champion,
    };
    this.router.navigate([`champions/details/${champion}`]);
  }

  clear() {
    this.errors = undefined;
    this.showSpinner = true;
    this.details = undefined;
    this.playerStats = undefined;
    this.players = [];
    this.currentGame = [];
  }

  changeRegion(region: string) {
    this.champService.regionCheckAndChange(region);
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  openLiveGame() {
    console.log(this.inGame);
  }
}
