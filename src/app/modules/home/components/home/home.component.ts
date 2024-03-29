import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {AddressModel} from "../../../../shared/models/address.model";
import {BusPageModel} from "../../../../shared/models/bus-page.model";
import {Router} from "@angular/router";
import {AutocompleteComponent} from "../../../../productive/components/autocomplete/autocomplete.component";
import {NotificationService} from "../../../../services/notification/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public addresses: AddressModel[] = [];
  public selectedAddress: BusPageModel = new BusPageModel();

  constructor(private _router: Router, private _notificationService: NotificationService) {
  }

  @ViewChild('firstAddress')
  private _firstAddress: AutocompleteComponent;
  @ViewChild('secondAddress')
  private _secondAddress: AutocompleteComponent;

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
      if (!this.selectedAddress.firstAddress) {
        this._firstAddress.model.control.markAllAsTouched();
      }
      if (!this.selectedAddress.secondAddress) {
        this._secondAddress.model.control.markAllAsTouched();
      }
      if (this.selectedAddress.firstAddress !== this.selectedAddress.secondAddress) {
        sessionStorage.setItem('addresses', JSON.stringify(this.selectedAddress));
        this._router.navigate(['/bus-line'])
      } else {
        this._notificationService.showError('Selecione endereços diferentes!');
      }
    }
  }
}

type Position = 'first' | 'second';
