import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-bus-path',
  templateUrl: './bus-path.component.html',
  styleUrls: ['./bus-path.component.css']
})
export class BusPathComponent {
  @Input()
  public peopleQty: number = 50;
}
