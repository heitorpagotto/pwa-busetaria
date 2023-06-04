import {Component, HostBinding, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../../shared/models/user.model";
import {NotificationService} from "../../../../services/notification/notification.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userForm: FormGroup;

  constructor(private _authService: AuthService, private _router: Router, private _notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.getUserInfo();
  }

  public logOut(): void {
    this._router.navigate(['/']);
    this._authService.logout();
  }

  public getUserInfo(): void {
    const user = sessionStorage.getItem('loggedUser');
    if (user) {
      this._setForm(JSON.parse(user) as UserModel);
    }
  }

  private _setForm(user: UserModel): void {
    this.userForm = new FormGroup({
      name: new FormControl(user.name, Validators.required),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      phone: new FormControl(user.phone, Validators.required),
    })
  }

  public saveUserInfo(): void {
    if (this.userForm.valid) {
      const userString = sessionStorage.getItem('loggedUser');
      const userListString = sessionStorage.getItem('users')
      if (userString && userListString) {
        const userParsed = JSON.parse(userString) as UserModel;
        const userListParsed = JSON.parse(userListString) as UserModel[];

        const formControlValue = this.userForm.value as UserModel;

        userParsed.name = formControlValue.name;
        userParsed.email = formControlValue.email;
        userParsed.phone = formControlValue.phone;

        const idx = userListParsed.findIndex(x => x.id === userParsed.id);
        if (idx >= 0) {
          userListParsed[idx] = userParsed;
        }

        sessionStorage.setItem('loggedUser', JSON.stringify(userParsed));
        sessionStorage.setItem('users', JSON.stringify(userListParsed));
        this._notificationService.showSuccess('Alterações salvas com sucesso!')
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  @HostBinding('class.d_contents')
  private get _defaultClass(): boolean {
    return true;
  }
}
