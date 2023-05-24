import {AfterContentInit, Component, ContentChild, ElementRef, HostBinding, HostListener, Input,} from '@angular/core';
import {AbstractControl, FormControlName, NgModel} from '@angular/forms';

@Component({
  selector: 'app-fieldset, p-fieldset',
  templateUrl: './fieldset.component.html',
})
export class FieldsetComponent implements AfterContentInit {
  /**
   * Floating label for the input fieldset
   */
  @Input()
  public label?: string;

  public invalidFieldset: boolean = false;
  public requiredFieldset: boolean = false;
  public errorText: string = '';

  private _errorMessages: FieldsetErrorMessages[] = [
    {
      code: 'required',
      message: 'Campo obrigatório',
    },
    {
      code: 'maxlength',
      message: 'Campo excedeu carácteres máximos',
    },
    {
      code: 'minlength',
      message: 'Campo não atingiu carácteres minimos',
    },
    {
      code: 'email',
      message: 'Email inválido',
    },
  ];

  @ContentChild(FormControlName, {static: false})
  public formControl?: FormControlName;
  @ContentChild(NgModel, {static: false})
  public ngModel?: NgModel;

  private _fieldForm?: FormControlName | NgModel;

  constructor(private _elementRef: ElementRef) {
  }

  public ngAfterContentInit(): void {
    this._fieldForm = this.formControl || this.ngModel;
  }

  private _hasError(): boolean {
    if (this._fieldForm) {
      if (!this._fieldForm.untouched) {
        if (this._fieldForm.errors) {
          this.invalidFieldset = true;
          const errors = Object.getOwnPropertyNames(this._fieldForm.errors);
          errors.forEach((element) => {
            const messageIndex = this._errorMessages.findIndex((x) =>
              x.code.includes(element)
            );
            if (messageIndex >= 0) {
              this.errorText = this._errorMessages[messageIndex].message;
            }
          });
        } else {
          this.invalidFieldset = false;
        }
        return (this._fieldForm.invalid &&
          (this._fieldForm.dirty || this._fieldForm.touched))!;
      }
    }
    this.invalidFieldset = false;
    return false;
  }

  @HostListener('click', ['$event'])
  private _focusInput(event: any): void {
    let input = this._elementRef.nativeElement.querySelector(
      'input,select,textarea'
    );
    const targetClick = event.target.parentElement as HTMLElement;
    if (!targetClick.closest('.prefix') && !targetClick.closest('.suffix')) {
      input.focus();
      this._elementRef.nativeElement.classList.add('focused');
      input.addEventListener('blur', () =>
        this._elementRef.nativeElement.classList.remove('focused')
      );
    }
  }

  @HostBinding('class.invalid')
  private get _inputInvalid(): boolean {
    return this._hasError();
  }

  @HostBinding('class.d_contents')
  private get _defaultClass(): boolean {
    return true;
  }

  @HostBinding('class.disabled')
  private get _inputDisabled(): boolean {
    let input = this._elementRef.nativeElement.querySelector(
      'input, select, textarea'
    );
    if (input.closest('.p-select-search') === null) {
      if (input.disabled) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  @HostBinding('class.required')
  private get _inputRequired(): boolean {
    if (this._fieldForm) {
      const abstr = this._fieldForm.control?.validator;
      if (abstr) {
        if (abstr({} as AbstractControl)?.['required']) {
          this.requiredFieldset = true;
          return true;
        } else {
          this.requiredFieldset = false;
          return false;
        }
      }
    }
    this.requiredFieldset = false;
    return false;
  }
}

class FieldsetErrorMessages {
  code: string = '';
  message: string = '';
}
