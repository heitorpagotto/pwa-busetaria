import {Component, HostBinding, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm?: FormGroup;

  public ngOnInit(): void {
    this._setRegisterForm();
  }

  private _setRegisterForm() {
    this.registerForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      phone: new FormControl(null),
      passWord: new FormControl(null, Validators.required)
    });
  }

  @HostBinding('class.d_contents')
  private get _defaultClass(): boolean {
    return true;
  }
}
