import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
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
  public initialBusTime: number;
  public animated: boolean = true;

  private _timeout: any;
  private _subtractInterval: Subscription;

  constructor(private _router: Router) {
  }

  public ngOnInit(): void {
    window.clearTimeout(this._timeout);
    this.getParsedAddresses();
  }

  public getParsedAddresses(): void {
    try {
      const storedAddress: string | null = sessionStorage.getItem('addresses');
      if (storedAddress) {
        this.addresses = JSON.parse(storedAddress) as BusPageModel;
        this._generateBus();
      } else {
        this.navigateBack();
      }
    } catch (error: any) {
      console.log(error);
      this.navigateBack();
    }
  }

  private _generateBus(): void {
    const busGood: BusModel = {
      line: 'Jd. Figueira',
      destination: this.addresses.secondAddress,
      personQty: 35,
      start: this.addresses.firstAddress,
      //timeToArrive: 580020,
      timeToArrive: 10000,
      totalSeats: 50,
      traffic: ETraffic.GOOD
    }
    const busMedium: BusModel = {
      line: 'São Dimas',
      destination: this.addresses.secondAddress,
      personQty: 20,
      start: this.addresses.firstAddress,
      timeToArrive: 1820000,
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

  public changeScreenType(screen: ScreenStatus): void {
    this.screenStatus = screen;
    if (this.screenStatus === 'embarked') {
      this.selectedBusRoute.personQty++;
    }
    if (this.screenStatus === 'finished') {
      this._subtractInterval.unsubscribe();
      this.animated = false;
      this.selectedBusRoute.timeToArrive = 0;
      this._timeout = setTimeout(() => {
        this.navigateBack();
      }, 5000)
    }
  }

  public selectBusRoute(route: BusModel): void {
    this.initialBusTime = route.timeToArrive;
    if (this.selectedBusRoute) {
      this.busRoutes.push(this.selectedBusRoute);
    }

    this.selectedBusRoute = route;
    this.animated = false;
    const idx = this.busRoutes.findIndex(x => x == route);
    if (idx >= 0) {
      this.busRoutes.splice(idx, 1);
    }

    const trafficOrder: ETraffic[] = [ETraffic.GOOD, ETraffic.MEDIUM, ETraffic.BAD];
    this.busRoutes = this.busRoutes.sort((a, b) => trafficOrder.indexOf(a.traffic) - trafficOrder.indexOf(b.traffic))

    if (this._subtractInterval) this._subtractInterval.unsubscribe();
    setTimeout(() => {
      this.animated = true;
    }, 0)
    this._subtractInterval = interval(1000).subscribe((e) => {
      if (this.selectedBusRoute.timeToArrive > 0) {
        this.selectedBusRoute.timeToArrive -= 1000
      }
      if (this.selectedBusRoute.timeToArrive <= 0) {
        this.selectedBusRoute.timeToArrive = 0;
      }

      if (this.selectedBusRoute.timeToArrive === (this.initialBusTime / 2) && this.screenStatus === 'no-embark') {
        this.changeScreenType('embarked');
      }
      if (this.selectedBusRoute.timeToArrive === 0) {
        this.changeScreenType('finished');
      }
    });
  }

  public navigateBack(): void {
    window.clearTimeout(this._timeout);
    this._router.navigate(['/']);
    sessionStorage.removeItem('addresses');
  }

  public ngOnDestroy(): void {
    this._subtractInterval?.unsubscribe();
  }

  @HostListener('window:resize')
  public isMobile(): boolean {
    return window.innerWidth <= 768;
  }
}

type ScreenStatus = 'no-embark' | 'embarked' | 'finished';
