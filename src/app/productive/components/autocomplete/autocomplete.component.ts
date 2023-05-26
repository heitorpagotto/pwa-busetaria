import {animate, style, transition, trigger} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

const animation = trigger('openMenu', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      '150ms cubic-bezier(.1,.5,.65,.99)',
      style({
        opacity: 1,
      })
    ),
  ]),
  transition(':leave', [
    animate('100ms cubic-bezier(.1,.5,.65,.99)', style({opacity: 0})),
  ]),
]);

@Component({
  selector: 'app-autocomplete, p-autocomplete',
  templateUrl: './autocomplete.component.html',
  animations: [animation],
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input()
  public fieldsetLabel?: string;
  @Input()
  public fielsetPlaceholder?: string;
  @Input()
  public dataArray?: any[];
  @Input()
  public showProp: string = '';
  @Input()
  public filterProp: string = '';
  @Input()
  public shouldFilterInArray: boolean = true;
  @Input()
  public fieldsetColor?: string;
  @Input()
  public shouldClearInput: boolean = false;
  @Input()
  public darkMode: boolean = false;
  @Input()
  public selectionId: any;
  @Output()
  public selectedData: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public searchValue?: string;
  @Output()
  public searchValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public scrolled: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isMenuOpen: boolean = false;
  public dataArrayBackup: any[] = [];

  @ViewChild('menu')
  private _menu?: ElementRef<HTMLElement>;
  @ViewChild('fieldset')
  private _fieldset?: ElementRef<HTMLElement>;

  constructor(
    private _renderer2: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.dataArrayBackup = this.dataArray?.slice()!;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['dataArray']?.firstChange) {
      this.dataArrayBackup = this.dataArray?.slice()!;
    }
    if (!changes['selectionId']?.firstChange) {
      if (changes['selectionId']) {
        if (this.selectionId) {
          const selected = this.dataArrayBackup.find(
            (x) => x.id === this.selectionId
          );
          if (selected && this.showProp) {
            this.searchValue = selected?.[this.showProp];
          } else {
            this.searchValue = '';
          }
        } else {
          this.searchValue = '';
        }
      }
    }
  }

  public ngAfterViewInit(): void {
    this._setToBody();
  }

  public openMenu(): void {
    this.isMenuOpen = true;
    this._createBackdrop();

    this._changeDetectorRef.detectChanges();
    this._setMenuPosition();
  }

  public closeMenu(): void {
    this.isMenuOpen = false;
    this._removeBackdrop();
  }

  public searchAutoComplete(autoComplete: string | any): void {
    this.searchValueChange.emit(autoComplete);
    this.searchValue = autoComplete;
    if (this.shouldFilterInArray) {
      if (!autoComplete) {
        this.dataArrayBackup = this.dataArray?.slice()!;
      } else {
        this.dataArrayBackup = this.dataArrayBackup?.filter((x) => {
          return x[!this.filterProp ? this.showProp : this.filterProp]
            .toString()
            .toUpperCase()
            .includes(autoComplete.toUpperCase());
        });
      }
    }
  }

  public selectOption(option: any): void {
    this.selectedData.emit(option);
    if (!this.shouldClearInput) {
      this.searchValue = option[this.showProp];
    } else {
      this.searchValue = '';
      this.searchAutoComplete('');
    }
    this.closeMenu();
  }

  private _setToBody(): void {
    let documentDOM = document.body.querySelector(
      '.p-components-container'
    ) as HTMLElement;

    if (!documentDOM) documentDOM = document.body;
    if (this._menu) {
      documentDOM.insertAdjacentElement('beforeend', this._menu?.nativeElement);
    }
  }

  private _setMenuPosition(): void {
    const fieldsetRect = this._fieldset?.nativeElement
      .closest('.fieldset')
      ?.getBoundingClientRect();

    if (fieldsetRect) {
      const hasNoPadding =
        this._fieldset?.nativeElement.closest('.fieldset')?.closest('.p-0') !==
        null;

      let menuTopCalculation = fieldsetRect.bottom - (hasNoPadding ? -10 : 25);
      let bottomMenuCalculation =
        fieldsetRect.top -
        (this._menu?.nativeElement.firstChild as HTMLElement).offsetHeight -
        (hasNoPadding ? -10 : 25);
      if (
        menuTopCalculation +
        (this._menu?.nativeElement.firstChild as HTMLElement).offsetHeight >
        window.innerHeight
      ) {
        if (bottomMenuCalculation <= 0) {
          this._renderer2.setStyle(
            this._menu?.nativeElement.firstChild,
            'top',
            '0px'
          );
        } else {
          this._renderer2.setStyle(
            this._menu?.nativeElement.firstChild,
            'top',
            bottomMenuCalculation + 'px'
          );
        }
      } else {
        this._renderer2.setStyle(
          this._menu?.nativeElement.firstChild,
          'top',
          menuTopCalculation + 'px'
        );
      }
      this._renderer2.setStyle(
        this._menu?.nativeElement.firstChild,
        'left',
        fieldsetRect.left + 'px'
      );
      this._renderer2.setStyle(
        this._menu?.nativeElement.firstChild,
        'width',
        fieldsetRect.width + 'px'
      );
    }
  }

  private _createBackdrop(): void {
    const backdropElement = this._renderer2.createElement('div') as HTMLElement;
    backdropElement.classList.add('backdrop');
    backdropElement.style.zIndex = '1019';
    backdropElement.id = 'auto-complete-backdrop';
    backdropElement.addEventListener('click', () => {
      this.closeMenu();
    });

    const htmlBody = document.body;
    htmlBody.insertAdjacentElement('beforeend', backdropElement);
  }

  private _removeBackdrop(): void {
    const backdropElement = this._renderer2.selectRootElement(
      '#auto-complete-backdrop'
    ) as HTMLElement;

    if (backdropElement) {
      backdropElement.remove();
    }
  }

  public emitScroll(event: any): void {
    this.scrolled.emit(event);
  }

  @HostBinding('class.dContents')
  private get _defaultClass(): boolean {
    return true;
  }

  public ngOnDestroy(): void {
    this._menu?.nativeElement.remove();
  }
}
