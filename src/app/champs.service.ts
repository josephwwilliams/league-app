import { Injectable, OnInit} from '@angular/core';
import { Champion } from './champion-format.model';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ChampsService implements OnInit{
  champions = {}
  selectedChampion = {}
  favoriteChampions = []

  constructor(private http:HttpClient) {}

  ngOnInit(): void {

  }

  favoriteClick(favChampion){
    if ((this.favoriteChampions.includes(favChampion))=== false){
      this.favoriteChampions.push(favChampion)
      this.favoriteChampions.sort(this.compare)
    } else return
    this.removeDuplicates()
    console.log(this.favoriteChampions)
  }
  removeDuplicates() {
    const uniqueValuesSet = new Set();
    const filteredArr = this.favoriteChampions.filter((obj) => {
      const isPresentInSet = uniqueValuesSet.has(obj.name);
      uniqueValuesSet.add(obj.name);
      obj['favorited'] = true
      return !isPresentInSet;
    });
    this.favoriteChampions = filteredArr
  }

  compare( champ1, champ2 ) {
    if ( champ1.name < champ2.name ){
      return -1;
    }
    if ( champ1.name > champ2.name ){
      return 1;
    }
    return 0;
  }

  getData(){
    return this.http.get<any>('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json');
  }
  // getChampionData(championDetails){
  //   console.log(championDetails)
  //   let id = championDetails.id
  //   return this.http.get<any>('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion/' + championDetails.id +'.json');
  // }
}
