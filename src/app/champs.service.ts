import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { exhaustMap, take } from 'rxjs/operators/';
// import { keys } from '../environments/keys'

@Injectable({
  providedIn: 'root',
})
export class ChampsService implements OnInit {
  name = '';
  champions = [];
  selectedChampion = {};
  favoriteChampions = [];
  championDetails;
  dataDragonVersion: string = '12.9.1';
  region = 'NA1';
  massRegion = 'AMERICAS';
  // apiKeyRoot = process.env.NODE_ENV === "development" ? keys.apiKeyRoot : process.env.API_KEY
  apiKeyRoot = 'api_key=RGAPI-a34c364a-c677-41fc-83e4-006e7bc009dd';

  regions = [
    { value: 'NA1', viewValue: 'NA' },
    { value: 'KR', viewValue: 'KR' },
    { value: 'JP1', viewValue: 'JP' },
    { value: 'EUN1', viewValue: 'EUNE' },
    { value: 'EUW1', viewValue: 'EUW' },
    { value: 'BR1', viewValue: 'BR' },
    { value: 'LA1', viewValue: 'LA1' },
    { value: 'LA2', viewValue: 'LA2' },
    { value: 'OC1', viewValue: 'OC' },
    { value: 'RU', viewValue: 'RU' },
    { value: 'TR1', viewValue: 'TR' },
  ];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    // this.getDDVersion()
    // console.log(this.dataDragonVersion)
  }

  favoriteClick(favChampion) {
    if (
      this.favoriteChampions === null ||
      this.favoriteChampions.length === 0
    ) {
      this.favoriteChampions = [];
      this.favoriteChampions.push(favChampion);
      this.favoriteChampions.sort(this.compare);
    } else if (this.favoriteChampions.includes(favChampion) === false) {
      this.favoriteChampions.push(favChampion);
      this.favoriteChampions.sort(this.compare);
    } else return;
    this.removeDuplicates();
  }

  removeDuplicates() {
    const uniqueValuesSet = new Set();
    const filteredArr = this.favoriteChampions.filter((obj) => {
      const isPresentInSet = uniqueValuesSet.has(obj.name);
      uniqueValuesSet.add(obj.name);
      obj['favorited'] = true;
      return !isPresentInSet;
    });
    this.favoriteChampions = filteredArr;
  }

  compare(champ1, champ2) {
    if (champ1.name < champ2.name) {
      return -1;
    }
    if (champ1.name > champ2.name) {
      return 1;
    }
    return 0;
  }

  getDDVersion() {
    return this.http.get<any>(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    );
  }

  getAllChampions(DDversion) {
    return this.http.get<any>(
      'https://ddragon.leagueoflegends.com/cdn/' +
        DDversion +
        '/data/en_US/champion.json'
    );
  }

  getChampionData(championDetails, DDversion) {
    let apiRoot =
      'https://ddragon.leagueoflegends.com/cdn/' +
      DDversion +
      '/data/en_US/champion/';
    let search = championDetails;
    let tail = '.json';
    let apiUrl = `${apiRoot}${search}${tail}`;
    return this.http.get<any>(apiUrl);
  }

  getSummonerByName(region, input) {
    let apiRoot =
      'https://' +
      region +
      '.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
    let name = input.replaceAll(' ', '%20');
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${name}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  getMatchesByPUUID(region, input) {
    let apiRoot =
      'https://' + region + '.api.riotgames.com/lol/match/v5/matches/by-puuid/';
    let apiKey = `${this.apiKeyRoot}`;
    let apiEnd = '/ids?start=0&count=10';
    let apiUrl = `${apiRoot}${input}${apiEnd}&${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  getChampsByMatch(region, input) {
    let apiRoot =
      'https://' + region + '.api.riotgames.com/lol/match/v5/matches/';
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${input}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  getPlayerStatsWithSummonerID(region, ID) {
    let apiRoot =
      'https://' +
      region +
      '.api.riotgames.com/lol/league/v4/entries/by-summoner/';
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${ID}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  getSummonerWithSummonerID(region, ID) {
    let apiRoot =
      'https://' + region + '.api.riotgames.com/lol/summoner/v4/summoners/';
    let apiKey = `?${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${ID}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  getTopTenPlayersInRegion(selectedRegion) {
    let apiRoot =
      'https://' +
      selectedRegion +
      '.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?';
    let apiKey = `${this.apiKeyRoot}`;
    let apiUrl = `${apiRoot}${apiKey}`;
    return this.http.get<any>(apiUrl);
  }

  regionCheckAndChange(region) {
    this.name = '';
    if (
      region === 'BR1' ||
      region === 'LA1' ||
      region === 'LA2' ||
      region === 'NA1' ||
      region === 'OC1'
    ) {
      this.region = `${region}`;
      this.massRegion = 'AMERICAS';
    } else if (region === 'KR' || region === 'JP1') {
      this.region = `${region}`;
      this.massRegion = 'ASIA';
    } else if (
      region === 'EUN1' ||
      region === 'EUW1' ||
      region === 'RU' ||
      region === 'TR1'
    ) {
      this.region = `${region}`;
      this.massRegion = 'EUROPE';
    }
  }

  addChampionsToFireBase() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.put(
          'https://league-stat-checker-default-rtdb.firebaseio.com/' +
            userEmail +
            'favorites.json',
          this.favoriteChampions
        );
      })
    );
  }

  addUsernameToFireBase(username: object) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.put(
          'https://league-stat-checker-default-rtdb.firebaseio.com/' +
            userEmail +
            'username.json',
          username
        );
      })
    );
  }

  fetchUsernameFromFireBase() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.get(
          'https://league-stat-checker-default-rtdb.firebaseio.com/' +
            userEmail +
            'username.json'
        );
      })
    );
  }

  fetchChampionsFromFireBase() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.get(
          'https://league-stat-checker-default-rtdb.firebaseio.com/' +
            userEmail +
            'favorites.json'
        );
      })
    );
  }

  returnItems() {
    return this.http.get<any>(
      'https://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/item.json'
    );
  }

  returnRunes() {
    return this.http.get<any>(
      'https://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/runesReforged.json'
    );
  }
}
