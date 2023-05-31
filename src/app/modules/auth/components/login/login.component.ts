import {Component, HostBinding, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm?: FormGroup;

  constructor(private _authService: AuthService, private _router: Router) {
  }

  public ngOnInit(): void {
    this._setFormGroup();
  }

  public login(): void {
    if (this.loginForm?.valid) {
      const loggedIn = this._authService.login(this.loginForm.value);
      if (loggedIn) {
        // TODO: Implementar toast de sucesso
        this._router.navigate(['/']);
      } else {
        // TODO: Implementar toast de Usuário ou Senha incorretos
      }
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
