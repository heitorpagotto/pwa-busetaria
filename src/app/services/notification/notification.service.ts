import {Injectable} from '@angular/core';
import {SnackbarService} from "../../productive/services/snackbar.service";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackbarService: SnackbarService) {
  }

  public showSuccess(message: string): void {
    this._snackbarService.openSnackbar(message, '', {
      class: 'snack_success',
      duration: 2500,
      position: 'bottom-right',
    });
  }

  public showError(message: string): void {
    this._snackbarService.openSnackbar(message, '', {
      class: 'snack_error',
      duration: 3500,
      position: 'bottom-right',
    });
  }

  public showWarning(message: string): void {
    this._snackbarService.openSnackbar(message, '', {
      class: 'snack_warning',
      duration: 2000,
      position: 'bottom-right',
    });
  }
}
