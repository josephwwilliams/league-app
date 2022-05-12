import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css'],
})
export class ChampionsComponent implements OnInit {
  champions: any = [];
  championSearch: string = '';
  dataDragonVersion: string;

  constructor(
    private champService: ChampsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataDragonVersion = this.champService.dataDragonVersion;
    this.champService
      .getAllChampions(this.dataDragonVersion)
      .subscribe((res) => {
        this.champions = res.data;
      });
  }

  clickedChampion(champion) {
    this.champService.selectedChampion = champion.value;
    this.router.navigate([`details/${champion.value.id}`], {
      relativeTo: this.route,
    });
  }
}
