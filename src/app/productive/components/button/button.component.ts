import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button, p-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input()
  public buttonSize?: ButtonSize;
  @Input()
  public buttonElevation?: boolean;
  @Input()
  public buttonClasses?: string;

  private _rippleDisabled: boolean = false;
  @Input()
  public get rippleDisabled(): boolean {
    return this._rippleDisabled;
  }

  public set rippleDisabled(disabled: boolean) {
    this._rippleDisabled = disabled;
  }

  private _disabled: boolean = false;
  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }

  public set disabled(disabled: boolean) {
    this._disabled = disabled;
  }

}

type ButtonSize = 'small' | 'medium' | 'large';
