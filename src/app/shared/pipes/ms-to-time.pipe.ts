import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'msToTime'
})
export class MsToTimePipe implements PipeTransform {

  transform(value: number): string {
    let seconds = Math.floor(value / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    hours = hours % 24;

    return `${this._padTo2Digits(hours)}h ${this._padTo2Digits(minutes)}m ${this._padTo2Digits(
      seconds,
    )}s`;
  }

  private _padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
