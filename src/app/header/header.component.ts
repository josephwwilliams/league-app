import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() locationSelected = new EventEmitter<string>();
  headerSelect(location:string){
    this.locationSelected.emit(location)
  }
  constructor(private navigation: NavigationService) { }

  ngOnInit(): void {
  }


}
