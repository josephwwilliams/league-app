import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChampsService } from 'src/app/champs.service';

@Component({
  selector: 'app-champion-dialog',
  templateUrl: './champion-dialog.component.html',
  styleUrls: ['./champion-dialog.component.css']
})
export class ChampionDialogComponent implements OnInit {
  dataDragonVersion:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private champService: ChampsService) { }

  ngOnInit(): void {
    this.dataDragonVersion = this.champService.dataDragonVersion;
  };

  replaceAll(string){
    return string.replaceAll(',', '/');
  };
}
