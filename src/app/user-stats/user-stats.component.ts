import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChampsService } from '../champs.service';
import { PlayerStatsComponent } from './player-stats/player-stats.component';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {
  constructor(private champService: ChampsService, private router: Router, public dialog: MatDialog) {}
  showSpinner = false
  public details;
  name = ''
  matches = []
  players = []
  summoner = []
  gameID= []
  playerStats
  errors;
  ngOnInit(): void {
    this.name = this.champService.name
    if(this.name !== '')this.submit()
  };
  submit(){
    if(this.showSpinner === false) {
      this.errors = undefined
      this.showSpinner = true
      this.details = undefined
      this.matches = []
      this.players = []
      this.summoner = []
      this.gameID = []
      this.playerStats = undefined
      this.champService.getSummonerByName('na1', this.name).subscribe(
        res=>{ this.details = res});
      setTimeout(() => { this.getMatches();}, 1000);
      setTimeout(() => { this.getChampions();}, 1500);
      setTimeout(() => { this.getStats();}, 2000);
      this.champService.name = this.name
    } else alert('Please Wait')
  }
  getMatches(){
    this.matches= []
    this.champService.getMatchesByPUUID(this.details.puuid).subscribe(
      res => this.matches = res
    )
  };

  getChampions(){
    this.players = []
    for(let i = 0; i < 10; i++){
      this.champService.getChampsByMatch(this.matches[i]).subscribe((res) => {
        this.gameID.push(res.info.gameStartTimestamp)
        this.gameID.sort()
        this.players.push(res.info.participants)
        console.log(this.gameID)
        }, (err) => {
          this.errors = err;
          this.showSpinner = false
        }
      )
    }
  };
  getStats(){
    this.champService.getPlayerStatsWithSummonerID(this.details.id).subscribe(
      res => {
        this.playerStats = res[0];
        console.log(this.playerStats)
        this.showSpinner = false;
      }
    )
  };
  log(player){
    console.log(player.totalDamageDealtToChampions)
    this.dialog.open(PlayerStatsComponent)
  };
  playerClick(playerName){
    this.champService.name = playerName
    this.name = playerName;
    this.submit()
  }
  championClick(champion){
    this.champService.selectedChampion = {
      id: champion
    }
    this.router.navigate([`champions/details/${champion}`])
  }
  clearName(){
    this.champService.name = ''
    this.name = ''
  }
}
