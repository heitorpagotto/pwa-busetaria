import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';

@Component({
  selector: 'app-autocomplete, p-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {
  @Input()
  public placeholder?: string = '';

  private _disabled: boolean = false;
  @Input()
  public get disabled(): boolean {
    return this._disabled
  };

  public set disabled(value: boolean) {
    this._disabled = value;
  }

  @Input()
  public value: any;
  @Output()
  public valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public hasIcon: boolean = false;

  @HostBinding('class.d_contents')
  private get _defaultClass(): boolean {
    return true;
  }
}
