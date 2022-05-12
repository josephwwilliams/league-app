import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ChampsService } from './champs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  title = 'league-app';
  loggedIn = false;
  opened = false;
  constructor(
    private champService: ChampsService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.loggedIn = !!user;
    });
    this.loggedIn = this.champService.loggedIn;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
