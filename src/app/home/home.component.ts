import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signup = false;
  value = 100;
  results = 10;
  newNames = [];
  names: any[];
  dataDragonVersion: string;

  data = [];
  data2;

  selectedValue: string;
  regions: { value: string, viewValue: string}[] = [];

  constructor(private champService: ChampsService, private router: Router) { }
  ngOnInit(): void {
    // this.champService.getDDVersion().subscribe(
    //   (res) => {
    //     this.dataDragonVersion = res[0];
    //     this.champService.dataDragonVersion = res[0];
    //     console.log(this.dataDragonVersion)
    //     console.log(this.champService.dataDragonVersion)
    //   }
    // );
    this.dataDragonVersion = this.champService.dataDragonVersion
    this.regions = this.champService.regions
    this.selectedValue = this.champService.region;
    this.printUsers(this.selectedValue);
  }

  log(){
    this.champService.returnItems().subscribe(
      (res:any) => {
        this.data = res.data
        // console.log(this.data)
      }
    )
    this.champService.returnRunes().subscribe(
      (res) => {
        this.data2 = res;
        // console.log(this.data2)
      }
    )
  }


  signingUp(form: NgForm){
    const value = form.value;
    this.champService.name = value.username;
  };

  printUsers(region: string){
    this.champService.regionCheckAndChange(region);
    this.champService.getTopTenPlayersInRegion(this.selectedValue).subscribe((data)=>{
      this.names = (data.entries.sort((a, b) => (a.leaguePoints > b.leaguePoints) ? -1 : 1));
      let newNames = [];
      for(let i = 0; i < this.results; i++){
        this.champService.getSummonerWithSummonerID(this.selectedValue, this.names[i].summonerId).subscribe((data)=>{
          newNames.push(data);
        })
      }
      this.newNames = newNames;
    });
  };

  playerClick(playerName){
    this.champService.name = playerName;
    this.router.navigate([`stats`]);
  };

}
