import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {
  constructor(private champService: ChampsService, private router: Router) {}
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
    this.details = undefined
    this.matches = []
    this.players = []
    this.summoner = []
    this.gameID = []
    this.playerStats = undefined
    this.champService.getSummonerByName(this.name).subscribe(
      res=>{ this.details = res});
    setTimeout(() => { this.getMatches();}, 1000);
    setTimeout(() => { this.getChampions();}, 1500);
    setTimeout(() => { this.getStats();}, 2000);
    this.name = ''
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
        this.players.sort((a,b)=>this.gameID.indexOf(a)-this.gameID.indexOf(b))
        }
      )
    }
  };
  getStats(){
    this.champService.getPlayerStatsWithSummonerID(this.details.id).subscribe(
      res => this.playerStats = res[0]
    )
  };
  log(){
    console.log(this.details)
    console.log(this.playerStats)
    console.log(this.details.puuid)
    console.log(this.matches)
    console.log(this.players)
    console.log(this.gameID)

  };
  playerClick(playerName){
    this.name = playerName;
    this.submit()
  }
  championClick(champion){
    this.champService.selectedChampion = {
      id: champion
    }
    this.router.navigate([`champions/details/${champion}`])
  }
}
