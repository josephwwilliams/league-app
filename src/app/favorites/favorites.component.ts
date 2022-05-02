import { Component, OnInit,} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  champions=[]
  constructor(private champService: ChampsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.champions=this.champService.favoriteChampions
    console.log(this.champions)
  }

  backToDetails(champion){
    this.router.navigate(['/champions'])
  }
  // clickedChampion(champion){
  //   this.champService.selectedChampion = champion.value
  //   this.router.navigate(['/champions/details'])
  // }
  clickedChampion(i){

  }
}
