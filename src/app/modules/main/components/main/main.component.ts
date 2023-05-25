import {Component} from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <div class="container">
      <nav class="navbar elevation-p2">
        <a class="btn flat small inverted" [routerLink]="['/']">
          <img src="./../../../../../assets/img/busetaria-logo.png" alt="BUS Logo" width="50px">
          BUS Etária
        </a>
        <button class="btn flat small inverted" [routerLink]="['/auth/login']" pRipple>
          Entrar
        </button>
      </nav>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class MainComponent {

}
