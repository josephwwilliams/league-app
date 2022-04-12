import { Injectable, OnInit} from '@angular/core';
import { Champion } from './champion-format.model';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ChampsService implements OnInit{
  champions = {}
  favoriteChampions = []


  constructor(private http:HttpClient) {}

  ngOnInit(): void {
  }
  getData(){
    return this.http.get<any>('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json')
  }
}
