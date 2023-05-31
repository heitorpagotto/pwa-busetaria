import {Component, HostBinding, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {LoginRequestModel} from "../../../../shared/models/login-request.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm?: FormGroup;

  constructor(private _authService: AuthService, private _router: Router) {
  }

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

  public register(): void {
    if (this.registerForm?.valid) {
      const registered = this._authService.register(this.registerForm.value);
      if (registered) {
        const loginReq = new LoginRequestModel();
        loginReq.userName = this.registerForm.get('userName')!.value;
        loginReq.passWord = this.registerForm.get('passWord')!.value;
        const loggedIn = this._authService.login(loginReq);
        if (loggedIn) {
          // TODO: implementar toast de sucesso
          this._router.navigate(['/']);
        } else {
          // TODO: implementar toast de erro
        }
      } else {
        // TODO: implementar toast de erro
      }
    } else {
      this.registerForm?.markAllAsTouched();
    }
  }

  @HostBinding('class.d_contents')
  private get _defaultClass(): boolean {
    return true;
  }
}
