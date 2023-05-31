import {Component} from '@angular/core';
import {UserModel} from "../../../../shared/models/user.model";

@Component({
  selector: 'app-main',
  template: `
    <div class="container">
      <nav class="navbar elevation-p2">
        <a class="btn flat small inverted">
          <img src="./../../../../../assets/img/busetaria-logo.png" alt="BUS Logo" width="50px">
          BUS Etária
        </a>
        <button class="btn small" [routerLink]="['/auth/login']" pRipple *ngIf="!loggedUser">
          Entrar
        </button>
        <ng-container *ngIf="loggedUser">
          <button class="btn small flat inverted" [routerLink]="['/user/profile']">
            <i class="bi bi-person-circle" style="margin-right: 1rem;"></i>
            {{loggedUser.name}}
          </button>
        </ng-container>
      </nav>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class MainComponent {

  public get loggedUser(): UserModel | undefined {
    const userString: string | null = sessionStorage.getItem('loggedUser');
    if (userString) {
      return JSON.parse(userString);
    }
    return undefined;
  }


}
