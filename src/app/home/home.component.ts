import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signup = false
  constructor(private champService: ChampsService) { }
  ngOnInit(): void {
  }
  signingUp(form: NgForm){
    const value = form.value;
    console.log(value)
    this.champService.name = value.username
  }
}
