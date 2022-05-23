import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ChampsService } from './champs.service';
import { fader } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fader],
})
export class AppComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  title = 'league-app';
  loggedIn = false;
  opened = false;
  constructor(
    private authService: AuthService,
    private champService: ChampsService
  ) {}
  ngOnInit(): void {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      this.loggedIn = !!user;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    if (this.champService.animations) {
      return (
        outlet &&
        outlet.activatedRouteData &&
        outlet.activatedRouteData['animation']
      );
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
