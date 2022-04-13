import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Champion } from '../champion-format.model';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  champions
  constructor(private champService: ChampsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.champions=this.champService.favoriteChampions
  }

  backToDetails(champion){
    this.router.navigate(['/champions'])
  }

}
