import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChampsService } from 'src/app/champs.service';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css'],
})
export class PlayerStatsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private champService: ChampsService
  ) {}
  dataDragonVersion: string;
  ngOnInit(): void {
    this.dataDragonVersion = this.champService.dataDragonVersion;
  }
}
