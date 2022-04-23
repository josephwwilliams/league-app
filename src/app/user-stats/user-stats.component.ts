import { Component, OnInit } from '@angular/core';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {
  constructor(private champService: ChampsService) {}
  public details;
  name = ''
  matches = []
  players = []
  summoner = []
  gameID= []
  playerStats
  ngOnInit(): void {
  }

  // submit(){
  //   this.details = ''
  //   this.champService.getSummonerByName(this.name).subscribe(
  //     res=> this.details = res);
  //   setTimeout(() => { this.getMatches();}, 1000);
  //   setTimeout(() => { this.getChampions();}, 2000);
  // }
  submit(){
    this.details
    this.matches = []
    this.players = []
    this.summoner = []
    this.gameID = []
    this.champService.getSummonerByName(this.name).subscribe(
      res=> this.details = res);
    setTimeout(() => { this.getMatches();}, 500);
    setTimeout(() => { this.getChampions();}, 1000);
    setTimeout(() => { this.getStats();}, 1500);
  }
  getMatches(){
    this.matches= []
    this.champService.getMatchesByPUUID(this.details.puuid).subscribe(
      res => this.matches = res
    )
  }
  log(){
    console.log(this.players)
    console.log(this.gameID)
    this.players.sort((a,b)=>this.gameID.indexOf(a)-this.gameID.indexOf(b))
  }
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
  }
  getStats(){
    this.champService.getPlayerStatsWithSummonerID(this.details.id).subscribe(
      res => this.playerStats = res[0]
    )
  }
  // getChampions(){
  //   this.players = []
  //   for(let i = 0; i < this.matches.length; i++){
  //     this.champService.getChampsByMatch(this.matches[i]).pipe(
  //       map((data)=>{
  //         this.players.push(data.info.participants)
  //       })
  //     ).subscribe(
  //       data => this.gameID.push(data.info.gameId)
  //     )
  //   }
  // }
}
