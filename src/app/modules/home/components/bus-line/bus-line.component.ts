import {Component, OnDestroy, OnInit} from '@angular/core';
import {BusPageModel} from "../../../../shared/models/bus-page.model";
import {Router} from "@angular/router";
import {BusModel} from "../../../../shared/models/bus.model";
import {ETraffic} from "../../../../shared/enum/ETraffic";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-bus-line',
  templateUrl: './bus-line.component.html',
  styleUrls: ['./bus-line.component.css']
})
export class BusLineComponent implements OnInit, OnDestroy {
  public addresses: BusPageModel;

  public busRoutes: BusModel[] = [];
  public selectedBusRoute: BusModel;
  public screenStatus: ScreenStatus = 'no-embark';

  private _subtractInterval: Subscription;

  constructor(private _router: Router) {
  }

  public ngOnInit(): void {
    this.getParsedAddresses();
  }

  public getParsedAddresses(): void {
    try {
      const storedAddress: string | null = sessionStorage.getItem('addresses');
      if (storedAddress) {
        this.addresses = JSON.parse(storedAddress) as BusPageModel;
        this._generateBus();
      } else {
        this._router.navigate(['/'])
      }
    } catch (error: any) {
      console.log(error);
      this._router.navigate(['/'])
    }
  }

  private _generateBus(): void {
    const busGood: BusModel = {
      line: 'Jd. Figueira',
      destination: this.addresses.secondAddress,
      personQty: 35,
      start: this.addresses.firstAddress,
      timeToArrive: 750020,
      totalSeats: 50,
      traffic: ETraffic.GOOD
    }
    const busMedium: BusModel = {
      line: 'São Dimas',
      destination: this.addresses.secondAddress,
      personQty: 20,
      start: this.addresses.firstAddress,
      timeToArrive: 1820050,
      totalSeats: 50,
      traffic: ETraffic.MEDIUM
    }
    const busBad: BusModel = {
      line: 'Jd. Europa',
      destination: this.addresses.secondAddress,
      personQty: 12,
      start: this.addresses.firstAddress,
      timeToArrive: 3280000,
      totalSeats: 50,
      traffic: ETraffic.BAD
    }
    this.busRoutes.push(busMedium, busBad);
    if (!this.selectedBusRoute) {
      this.selectBusRoute(busGood);
    }
  }

  public selectBusRoute(route: BusModel): void {
    if (this.selectedBusRoute) {
      this.busRoutes.push(this.selectedBusRoute);
    }
    this.selectedBusRoute = route;
    const idx = this.busRoutes.findIndex(x => x == route);
    if (idx >= 0) {
      this.busRoutes.splice(idx, 1);
    }

    const trafficOrder: ETraffic[] = [ETraffic.GOOD, ETraffic.MEDIUM, ETraffic.BAD];
    this.busRoutes = this.busRoutes.sort((a, b) => trafficOrder.indexOf(a.traffic) - trafficOrder.indexOf(b.traffic))

    if (this._subtractInterval) this._subtractInterval.unsubscribe();

    this._subtractInterval = interval(1000).subscribe((e) => {
      if (this.selectedBusRoute.timeToArrive > 0) {
        this.selectedBusRoute.timeToArrive -= 1000
      }
    });
  }

  public navigateBack(): void {
    this._router.navigate(['/']);
    sessionStorage.removeItem('addresses');
  }

  public ngOnDestroy(): void {
    this._subtractInterval?.unsubscribe();
  }
}

type ScreenStatus = 'no-embark' | 'embarked' | 'finished';
