import {Component, EventEmitter, HostBinding, Input, Output, Renderer2} from '@angular/core';

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

  public showPanel: boolean = false;

  constructor(private _renderer2: Renderer2) {
  }

  public openMenu(): void {
    this.showPanel = true;
    this._setBackdrop();
  }

  public closeMenu(): void {
    this.showPanel = false;
  }

  private _setBackdrop(): void {
    const backdrop: HTMLElement = this._renderer2.createElement('div');

    backdrop.classList.add('backdrop');
    backdrop.addEventListener('click', () => {
      this.closeMenu();
      backdrop.remove();
    });
    document.body.insertAdjacentElement('beforeend', backdrop);
  }

  @HostBinding('class.d_contents')
  private get _defaultClass(): boolean {
    return true;
  }
}
