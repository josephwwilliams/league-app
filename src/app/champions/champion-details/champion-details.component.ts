import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ChampsService } from 'src/app/champs.service';
import { ChampionDialogComponent } from './champion-dialog/champion-dialog.component';

@Component({
  selector: 'app-champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.css'],
})
export class ChampionDetailsComponent implements OnInit {
  seeSplash = false;
  added = false;
  selectedChampion;
  champDetails: any = [];
  dataDragonVersion: string;
  showSpinner = false;
  constructor(
    private champService: ChampsService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  dialSpecs = {
    autoTicks: false,
    invert: false,
    max: undefined,
    min: 0,
    showTicks: true,
    step: 1,
    thumbLabel: false,
    value: 0,
    disabled: true,
    vertical: false,
    tickInterval: 1,
  };

  sendToFavorites() {
    this.champService.favoriteClick(this.champDetails[0]);
    this.champService.addChampionsToFireBase().subscribe();
    this.added = true;
  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.dataDragonVersion = this.champService.dataDragonVersion;
    // this.selectedChampion = this.champService.selectedChampion;
    this.selectedChampion = this.route.snapshot.params['id'];

    this.champService
      .getChampionData(this.selectedChampion, this.dataDragonVersion)
      .subscribe((res) => {
        this.dialSpecs.value = 0;
        this.champDetails.push(res.data[this.selectedChampion]);
        this.dialSpecs.max = this.champDetails[0].skins.length - 1;
        this.showSpinner = false;
      });
  }

  goRight() {
    if (this.dialSpecs.value !== this.champDetails[0].skins.length - 1) {
      this.dialSpecs.value = this.dialSpecs.value + 1;
    }
  }

  goLeft() {
    if (this.dialSpecs.value !== 0) {
      this.dialSpecs.value = this.dialSpecs.value - 1;
    }
  }

  spellClick(info) {
    this.dialog.open(ChampionDialogComponent, { data: { info } });
  }
}
