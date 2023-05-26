import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './components/home/home.component';
import {SharedModule} from "../../shared/shared.module";
import { BusLineComponent } from './components/bus-line/bus-line.component';


@NgModule({
  declarations: [
    HomeComponent,
    BusLineComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
