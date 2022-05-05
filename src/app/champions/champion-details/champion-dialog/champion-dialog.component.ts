import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-champion-dialog',
  templateUrl: './champion-dialog.component.html',
  styleUrls: ['./champion-dialog.component.css']
})
export class ChampionDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  replaceAll(string){
    return string.replaceAll(',', '/')
  }
}
