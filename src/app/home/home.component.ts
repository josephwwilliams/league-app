import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs-compat/operator/mergeMap';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signup = false
  value = 100
  results = 10
  names
  constructor(private champService: ChampsService, private http: HttpClient, private router: Router) { }
  ngOnInit(): void {

    this.log()
    this.printUsers()
  }
  signingUp(form: NgForm){
    const value = form.value;
    console.log(value)
    this.champService.name = value.username
  }
  log(){
    return this.http.get<any>('https://'+ 'kr' +'.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-ec0193ad-80f5-4e38-85e0-249f123b9f6e')
  }
  printUsers(){
    this.log().subscribe((data)=>{
      this.names = (data.entries.sort((a, b) => (a.leaguePoints > b.leaguePoints) ? -1 : 1))
      for(let i = 0; i < this.results; i++){
        this.champService.getSummonerByName('kr', this.names[i].summonerName).subscribe((data)=>{
          this.names[i]['profileIconId'] = data.profileIconId;
        })
      }

    })
  }
  // printUsers(){
  //   this.champService.getSummonerByName('na1', 'fear').then((data)=>{
  //     console.log(data)
  //   })
  // }

  playerClick(playerName){
    this.champService.name = playerName
    this.router.navigate([`stats`])
  }

}
