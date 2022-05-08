import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ChampsService } from '../champs.service';
import { PlayerStatsComponent } from './player-stats/player-stats.component';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {
  constructor(private champService: ChampsService, private router: Router, public dialog: MatDialog) {}
  showSpinner = false;
  details;
  name = '';
  players = [];
  playerStats: any;
  errors: any;

  ngOnInit(): void {
    this.name = this.champService.name
    if(this.name !== '') {
      this.submit();
    }
  };

  submit(){
    if(this.showSpinner === false) {
      this.clear()
      this.champService.getSummonerByName('na1', this.name).subscribe(
        (res) => {
            this.details = res;
            this.champService.getMatchesByPUUID(this.details.puuid).subscribe(
              (res) => {
                forkJoin(res.map((match: any) => this.champService.getChampsByMatch(match))).subscribe(
                  (res:any) => {
                    res.forEach((data, i) => {
                      this.players.push(data.info.participants);
                      this.players[i]['gameCreation'] = data.info.gameCreation;
                      this.players.sort(((a, b) => (a.gameCreation > b.gameCreation) ? -1 : 1));
                    });
                    this.champService.getPlayerStatsWithSummonerID(this.details.id).subscribe(
                      (res) => {
                        this.playerStats = res[0];
                        this.showSpinner = false;
                      },
                      (err) => {
                        this.errors = err;
                        this.showSpinner = false;
                      }
                    );
                  }, (err) => {
                    this.errors = err;
                    this.showSpinner = false;
                  }
                );
              }, (err) => {
                this.errors = err;
                this.showSpinner = false;
              }
            );
          }, (err) => {
            this.errors = err;
            this.showSpinner = false;
          }
      );
      this.champService.name = this.name;
    } else alert('Please Wait');
  };

  log(player: { totalDamageDealtToChampions: any; }){
    console.log(player.totalDamageDealtToChampions);
    this.dialog.open(PlayerStatsComponent);
  };

  playerClick(playerName: string){
    this.champService.name = playerName;
    this.name = playerName;
    this.submit();
  };

  championClick(champion: any){
    this.champService.selectedChampion = {
      id: champion
    }
    this.router.navigate([`champions/details/${champion}`]);
  };

  clear(){
    this.errors = undefined;
    this.showSpinner = true;
    this.details = undefined;
    this.playerStats = undefined;
    this.players = [];
  };
}
