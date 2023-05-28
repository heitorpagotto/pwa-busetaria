import {Component, HostBinding, OnInit} from '@angular/core';
import {AddressModel} from "../../../../shared/models/address.model";
import {BusPageModel} from "../../../../shared/models/bus-page.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public addresses: AddressModel[] = [];
  public selectedAddress: BusPageModel = new BusPageModel();

  constructor(private _router: Router) {
  }

  @HostBinding('class.d_contents')
  private get _defaultClass(): boolean {
    return true;
  }

  public ngOnInit(): void {
    this.addresses.push({
      street: 'Rua Uruguai',
      city: 'Amparo',
      neighborhood: 'Jardim Adélia',
      busStop: 'Jardim Adélia'
    });
    this.addresses.push({
      street: 'Rua Inglaterra',
      city: 'Amparo',
      neighborhood: 'Jardim Camandocaia',
      busStop: 'Jardim Camandocaia'
    });
    this.addresses.push({
      street: 'Rua 13 de Maio',
      city: 'Amparo',
      neighborhood: 'Centro',
      busStop: 'Centro'
    });
    this.addresses.push({
      street: 'Rua Pintassilgo',
      city: '',
      neighborhood: 'Jardim das Aves',
      busStop: 'Jardim das Aves'
    });
  }

  public selectAddress(address: AddressModel, position: Position): void {
    switch (position) {
      case 'first':
        this.selectedAddress.firstAddress = address;
        break;
      case 'second':
        this.selectedAddress.secondAddress = address;
        break;
    }
  }

  public nextPage(): void {
    if (this.selectedAddress) {
      if (this.selectedAddress.firstAddress !== this.selectedAddress.secondAddress) {
        this._router.navigate(['/bus-line'])
      }
    }
  }
}

type Position = 'first' | 'second';
