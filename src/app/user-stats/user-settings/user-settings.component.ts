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
  selectedValue: string;
  regions: { value: string; viewValue: string }[] = [];
  version: string;
  dataDragonVersions = [];
  changed: boolean = false;
  autoSearch: boolean = false;
  haveAnimations = false;
  editMode = false;
  email: string;
  username = {
    username: '',
  };

  ngOnInit(): void {
    this.champService.fetchUserDataFromFireBase().subscribe((res: any) => {
      this.regions = this.champService.regions;
      this.selectedValue = res.region[0];
    });
    this.version = this.champService.dataDragonVersion;
    this.getUserData();
    this.champService.getDDVersion().subscribe((res) => {
      this.dataDragonVersions = res;
      this.dataDragonVersions = this.dataDragonVersions.filter(
        (e, i) => i < this.dataDragonVersions.length - 98
      );
    });
  }
  changeUsername() {
    this.champService.editUserDataOnFireBase(this.username).subscribe();
  }

  getUserData() {
    this.champService.fetchUserDataFromFireBase().subscribe((res: any) => {
      this.username = res.username[0];
      this.email = res.email;
      this.haveAnimations = res.animations[0];
      this.champService.animations = res.animations[0];
      this.autoSearch = res.autoSearch[0];
    });
  }

  onSubmit(form: NgForm) {
    this.changed = true;
    setTimeout(() => {
      this.changed = false;
    }, 2000);
    this.champService.dataDragonVersion = form.value.version;
    this.username = form.value.username;
    if (form.value.enableAutoSearch !== true) {
      this.autoSearch = false;
      this.champService.editAutoSearchDataOnFireBase(false).subscribe();
    } else {
      this.autoSearch = true;
      this.champService.editAutoSearchDataOnFireBase(true).subscribe();
    }

    if (form.value.enableAnimations !== true) {
      this.haveAnimations = false;
      this.champService.animations = false;
      this.champService.editAnimationsDataOnFireBase(false).subscribe();
    } else {
      this.haveAnimations = true;
      this.champService.animations = true;
      this.champService.editAnimationsDataOnFireBase(true).subscribe();
    }
    this.champService.editRegionDataOnFireBase(form.value.region).subscribe();
    this.changeUsername();
  }
}
