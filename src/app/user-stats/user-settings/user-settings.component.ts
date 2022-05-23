import { Component, OnInit } from '@angular/core';
import { ChampsService } from '../../champs.service';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  constructor(
    private champService: ChampsService,
    private authService: AuthService
  ) {}
  version: string;
  dataDragonVersions = [];
  changed: boolean = false;
  autoSearch: boolean = true;
  haveAnimations = true;
  editMode = false;
  email: string;
  username = {
    username: '',
  };

  ngOnInit(): void {
    this.version = this.champService.dataDragonVersion;
    this.getUserData();
    this.champService.getDDVersion().subscribe((res) => {
      this.dataDragonVersions = res;
    });
    // this.haveAnimations = this.champService.animations;
  }
  changeUsername() {
    this.champService.editUserDataOnFireBase(this.username).subscribe();
  }
  // getUsername() {
  //   this.champService.fetchUsernameDataFromFireBase().subscribe((res: any) => {
  //     console.log(res);
  //     if (res !== null) {
  //       this.username = res;
  //     } else {
  //       this.username = {
  //         username: '',
  //       };
  //     }
  //   });
  // }

  getUserData() {
    this.champService.fetchUserDataFromFireBase().subscribe((res: any) => {
      console.log(res);
      this.username = res.username[0];
      this.email = res.email;
      this.champService.animations = res.animations;
      console.log(res.animations);
      // this.champService.animations =
    });
  }

  onSubmit(form: NgForm) {
    this.changed = true;
    setTimeout(() => {
      this.changed = false;
    }, 2000);
    console.log(form.value.username);
    this.champService.dataDragonVersion = form.value.version;
    this.username = form.value.username;
    console.log(form.value.username);
    if (form.value.enableAnimations !== true) {
      this.haveAnimations = false;
      this.champService.animations = false;
      return;
    } else {
      this.haveAnimations = true;
      this.champService.animations = true;
    }
    this.changeUsername();
  }
}
