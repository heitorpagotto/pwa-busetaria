import {Component} from '@angular/core';

@Component({
  selector: 'app-main',
  styleUrls: ['./main.component.css'],
  template: `
    <div class="container">
      <nav class="navbar elevation-p2">
        BUSETARIA
      </nav>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class MainComponent {

}
