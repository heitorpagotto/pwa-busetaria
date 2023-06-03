import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public snackbarCustomAction: any;

  constructor() {
  }

  public openSnackbar(
    message: string,
    actionLabel?: string,
    snackbarOptions?: SnackbarOptions
  ): void {
    const activeSnackbars = document.querySelectorAll('.p-snackbar-wrapper');
    if (activeSnackbars.length > 0) {
      let i = 0;
      for (; i < activeSnackbars.length; i++) {
        activeSnackbars[i].remove();
      }
      this._createSnackbar(message, actionLabel, snackbarOptions);
    } else {
      this._createSnackbar(message, actionLabel, snackbarOptions);
    }
  }

  public dissmissSnackbar(snackbarContainerElement: HTMLElement): void {
    snackbarContainerElement.remove();
  }

  private _createSnackbar(
    message: string,
    actionLabel?: string,
    options?: SnackbarOptions
  ): void {
    let snackbarDuration = 2500;
    const snackbarContainer = document.createElement('div');
    const actualSnackbar = document.createElement('div');

    snackbarContainer.classList.add('p-snackbar-wrapper');
    actualSnackbar.classList.add('p-snackbar', 'elevation-p8');

    actualSnackbar.innerHTML = `<span>${message}</span>`;

    if (actionLabel || this.snackbarCustomAction) {
      const button = document.createElement('button');
      if (actionLabel) {
        button.innerText = actionLabel;
      }
      button.classList.add('btn', 'flat', 'secondary', 'small');

      button.addEventListener('click', () => {
        if (this.snackbarCustomAction) {
          this._executeFunction();
        }
        actualSnackbar.classList.add('leaving');
        actualSnackbar.addEventListener('animationend', () => {
          this.dissmissSnackbar(snackbarContainer);
        });
        window.clearTimeout(time);
      });

      actualSnackbar.insertAdjacentElement('beforeend', button);
    }

    if (options?.class) {
      actualSnackbar.classList.add(options.class);
    }

    if (options?.duration) {
      snackbarDuration = options.duration;
    }

    this._setPositions(snackbarContainer, options?.position);

    snackbarContainer.insertAdjacentElement('beforeend', actualSnackbar);

    document.body.insertAdjacentElement('beforeend', snackbarContainer);

    const time = window.setTimeout(() => {
      actualSnackbar.classList.add('leaving');
      actualSnackbar.addEventListener('animationend', () => {
        this.dissmissSnackbar(snackbarContainer);
      });
    }, snackbarDuration);
  }

  private _executeFunction(): void {
    this.snackbarCustomAction();
  }

  private _setPositions(
    snackbarContainer: HTMLElement,
    positioning?: SnackbarPositioning
  ): void {
    switch (positioning) {
      case 'top-right':
        snackbarContainer.style.top = '0';
        snackbarContainer.style.right = '0';
        break;
      case 'top-left':
        snackbarContainer.style.top = '0';
        snackbarContainer.style.left = '0';
        break;
      case 'top-center':
        snackbarContainer.style.top = '0';
        snackbarContainer.style.left = '50%';
        snackbarContainer.style.transform = 'translateX(-50%)';
        break;
      case 'bottom-right':
        snackbarContainer.style.bottom = '0';
        snackbarContainer.style.right = '0';
        break;
      case 'bottom-left':
        snackbarContainer.style.bottom = '0';
        snackbarContainer.style.left = '0';
        break;
      case 'bottom-center':
        snackbarContainer.style.bottom = '0';
        snackbarContainer.style.left = '50%';
        snackbarContainer.style.transform = 'translateX(-50%)';
        break;
      default:
        snackbarContainer.style.bottom = '0';
        snackbarContainer.style.left = '50%';
        snackbarContainer.style.transform = 'translateX(-50%)';
        break;
    }
  }
}

export class SnackbarOptions {
  class?: string;
  duration?: number;
  position?: SnackbarPositioning;
}

type SnackbarPositioning =
  | 'top-left'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'
  | 'top-right'
  | 'bottom-right';
