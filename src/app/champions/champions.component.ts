import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Champion } from '../champion-format.model';
import { ChampsService } from '../champs.service';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {
  champions:any = {}

  constructor(private champService: ChampsService,private http:HttpClient) { }

  ngOnInit(): void {
    this.champService.getData().subscribe(
      res=> this.champions = res.data
    );
  }
}
