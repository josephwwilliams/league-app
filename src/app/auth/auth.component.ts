import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ChampsService } from '../champs.service';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  user;

  private userSub: Subscription;
  oldUser = false;

  loggedIn = false;
  isLoading = false;
  isLoginMode = true;
  error: string = null;

  selectedValue: string;
  regions: { value: string; viewValue: string }[] = [];
  constructor(
    private champService: ChampsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.authService.oldUser = true;
    } else this.authService.oldUser = false;
    this.oldUser = this.authService.oldUser;
    this.selectedValue = this.champService.region;
    this.regions = this.champService.regions;

    this.userSub = this.authService.user.subscribe((user) => {
      this.loggedIn = !!user;
    });
  }

  onSubmit(form: NgForm) {
    this.authService.form = form.value;
    this.champService.regionCheckAndChange(form.value.region);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe(
      (res) => {
        this.isLoading = false;
        if (!this.isLoginMode) {
          this.champService
            .addUserToFireBase(this.authService.form)
            .subscribe();
        }
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    // form.reset();
  }

  newOrOld() {
    if (this.isLoginMode) {
      this.authService.oldUser = true;
      this.oldUser = true;
    } else {
      this.authService.oldUser = false;
      this.oldUser = false;
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
