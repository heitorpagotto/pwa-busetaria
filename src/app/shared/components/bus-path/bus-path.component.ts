import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-bus-path',
  templateUrl: './bus-path.component.html',
  styleUrls: ['./bus-path.component.css']
})
export class BusPathComponent {
  @Input()
  public peopleQty: number = 50;
  @Input()
  public timeToArrive: number = 0;
  @Input()
  public animated: boolean;
  @Input()
  public isPastHalfwayPoint: boolean = false;
  @Input()
  public hasEmbarked: boolean = false;
  @Input()
  public isComplete: boolean = false;
}
