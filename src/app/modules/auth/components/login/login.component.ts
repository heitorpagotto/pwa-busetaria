import {Component, HostBinding, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm?: FormGroup;

  public ngOnInit(): void {
    this._setFormGroup();
  }

  public login(): void {
    if (this.loginForm?.valid) {
    } else {
      this.loginForm?.markAllAsTouched();
    }
  }

  private _setFormGroup(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      passWord: new FormControl(null, Validators.required)
    });
  }

  @HostBinding('class.d_contents')
  private get _defaultClass(): boolean {
    return true;
  }
}
