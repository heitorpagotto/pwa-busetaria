import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @HostBinding('class.d_contents')
  private get _defaultClass(): boolean {
    return true;
  }

}
