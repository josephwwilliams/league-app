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

  isChecked = true;
  editMode = false;
  email: string;
  username = {
    username: '',
  };

  ngOnInit(): void {
    this.getUsername();
  }
  changeUsername() {
    console.log(this.username);
    this.champService.addUsernameToFireBase(this.username).subscribe();
  }
  getUsername() {
    this.champService.fetchUsernameFromFireBase().subscribe((res: any) => {
      if (res !== null) {
        this.username = res;
        console.log(res);
        console.log(this.username);
      } else {
        this.username = {
          username: '',
        };
      }
    });
    this.authService.user.subscribe((res) => (this.email = res.email));
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.username.username = form.value.username;
    this.changeUsername();
    if (form.value.enableAS !== true) {
      this.champService.name = '';
      return;
    } else {
      this.champService.name = form.value.username;
    }
  }
}
