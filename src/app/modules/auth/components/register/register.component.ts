import {Component, HostBinding, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {LoginRequestModel} from "../../../../shared/models/login-request.model";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../services/notification/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm?: FormGroup;

  constructor(private _authService: AuthService, private _router: Router, private _notificationService: NotificationService) {
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
          this._notificationService.showSuccess('Registrado com Sucesso!');
          this._router.navigate(['/']);
        } else {
          this._notificationService.showError('Erro ao autenticar. Tente novamente');
        }
      } else {
        this._notificationService.showError('Erro ao cadastrar. Tente novamente');
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
