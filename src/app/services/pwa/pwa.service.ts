import {Injectable} from '@angular/core';
import {SwUpdate, VersionEvent} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  constructor(private _swUpdate: SwUpdate) {
  }

  public verifyUpdate(): void {
    if (this._swUpdate.isEnabled) {
      this._swUpdate.versionUpdates.subscribe((response: VersionEvent) => {
        if (response.type === 'VERSION_READY') {
          alert('Nova versão do aplicativo BUS ETÁRIA disponível!');
          window.location.reload();
        }
      });
    }
  }
}
