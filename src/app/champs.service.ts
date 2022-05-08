import { Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ChampsService implements OnInit{
  name = 'fear'
  champions = []
  selectedChampion = {}
  favoriteChampions = []
  championDetails;
  apiKeyRoot = 'api_key='

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
  };

  favoriteClick(favChampion){
    if ((this.favoriteChampions.includes(favChampion))=== false){
      this.favoriteChampions.push(favChampion);
      this.favoriteChampions.sort(this.compare);
    } else return;
    this.removeDuplicates()
  };

  removeDuplicates() {
    const uniqueValuesSet = new Set();
    const filteredArr = this.favoriteChampions.filter((obj) => {
      const isPresentInSet = uniqueValuesSet.has(obj.name);
      uniqueValuesSet.add(obj.name);
      obj['favorited'] = true;
      return !isPresentInSet;
    });
    this.favoriteChampions = filteredArr;
  };

  compare( champ1, champ2 ) {
    if ( champ1.name < champ2.name ){
      return -1;
    }
    if ( champ1.name > champ2.name ){
      return 1;
    }
    return 0;
  };

  getAllChampions(){
    return this.http.get<any>('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json');
  };

  getChampionData(championDetails){
    let apiRoot = 'http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion/';
    let search = championDetails;
    let tail = '.json';
    let apiUrl = `${apiRoot}${search}${tail}`;
    return this.http.get<any>(apiUrl);
  };

  getSummonerByName(region, input){
    let apiRoot = 'https://' + region + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
    let name = input.replaceAll(' ', '%20');
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${name}${apiKey}`;
    return this.http.get<any>(apiUrl);
  };

  getMatchesByPUUID(input){
    let apiRoot = 'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/';
    let apiKey = `${this.apiKeyRoot}`;
    let apiEnd = '/ids?start=0&count=10';
    let apiUrl = `${apiRoot}${input}${apiEnd}&${apiKey}`;
    return this.http.get<any>(apiUrl);
  };

  getChampsByMatch(input){
    let apiRoot = 'https://americas.api.riotgames.com/lol/match/v5/matches/';
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${input}${apiKey}`;
    return this.http.get<any>(apiUrl);
  };

  getPlayerStatsWithSummonerID(ID){
    let apiRoot = 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/';
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${ID}${apiKey}`;
    return this.http.get<any>(apiUrl);
  };
}
