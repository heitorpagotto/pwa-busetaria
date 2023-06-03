import {animate, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, Component, Directive, ElementRef, HostBinding, HostListener, Input,} from '@angular/core';

@Directive({
  selector: '[appModalTrigger], [pModalTrigger], [p-modal-trigger]',
})
export class ModalTriggerDirective {
  @Input() pModalTrigger: ModalComponent;

  @HostListener('click', ['$event'])
  openModal(): void {
    this.pModalTrigger.openModal();
  }
}

@Directive({
  selector: '[appModalClose], [pModalClose], [p-modal-close]',
})
export class ModalCloseDirective {
  @Input() pModalClose: ModalComponent;

  @HostListener('click', ['$event'])
  openModal(): void {
    this.pModalClose.closeModal();
  }
}

@Component({
  selector: 'app-modal, p-modal',
  templateUrl: './modal.component.html',
  animations: [
    trigger('modalRegular', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-50%) translateX(-50%) scale(0.9)',
        }),
        animate(
          '300ms cubic-bezier(0,0,.2,1)',
          style({
            opacity: 1,
            transform: 'translateY(-50%) translateX(-50%) scale(1)',
          })
        ),
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0,0,.2,1)', style({opacity: 0})),
      ]),
    ]),
  ],
})
export class ModalComponent implements AfterViewInit {
  /**
   * Makes the modal open whenever the component is initialized.
   */
  @Input() pModalShow = false;
  /**
   * Does not perform the action of closing the modal when clicking the backdrop.
   */
  @Input() pModalStatic = false;
  /**
   * Changes the size of the modal.
   */
  @Input() pModalSize: ModalSize = 'medium';
  /**
   * Sets an Id to the modal element.
   */
  @Input() pModalId: any;
  /**
   * Toggles the visual style of the modal to be more like a bottom sheet.
   */
  @Input() pBottomSheet = false;

  isOpen = false;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    if (this.pModalShow) {
      setTimeout(() => {
        this.openModal();
      }, 0);
    }
  }

  public openModal(): void {
    this.isOpen = true;
    setTimeout(() => {
      const modal = this.el.nativeElement.firstChild;
      if (this.pModalStatic) {
        modal.classList.add('modal-static');
      }
      const background = document.createElement('div');
      background.classList.add('backdrop-modal');
      const body = document.body;
      body.insertAdjacentElement('beforeend', background);
      body.style.overflow = 'hidden';
      background.style.zIndex = '999';
      background.style.opacity = '0.5';
      setTimeout(() => {
        if (!modal.classList.contains('modal-static')) {
          background.addEventListener('click', () => {
            this.closeModal();
          });
        }
      }, 0);
    }, 0);
  }

  public closeModal(): void {
    this.isOpen = false;
    const backdrop = document.querySelector(
      '.backdrop-modal'
    ) as HTMLDivElement;
    backdrop.style.opacity = '0';
    document.body.style.overflow = 'visible';
    backdrop.addEventListener('transitionend', () => {
      backdrop.remove();
    });
  }
}

@Component({
  selector: 'app-modal-header, p-modal-header',
  template: `
    <ng-content></ng-content> `,
})
export class ModalHeaderComponent {
  constructor() {
  }

  @HostBinding('class.modal-header')
  get DefaultClass() {
    return true;
  }
}

@Component({
  selector: 'app-modal-footer, p-modal-footer',
  template: `
    <ng-content></ng-content> `,
})
export class ModalFooterComponent {
  constructor() {
  }

  @HostBinding('class.modal-footer')
  get DefaultClass() {
    return true;
  }
}

@Component({
  selector: 'app-modal-content, p-modal-content',
  template: `
    <ng-content></ng-content> `,
})
export class ModalContentComponent {
  constructor() {
  }

  @HostBinding('class.modal-content')
  get DefaultClass() {
    return true;
  }
}

type ModalSize = 'small' | 'medium' | 'large';
