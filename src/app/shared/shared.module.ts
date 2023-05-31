import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductiveModule} from "../productive/productive.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontSizeAccessibilityComponent} from './components/font-size-accessibility/font-size-accessibility.component';
import {BusPathComponent} from './components/bus-path/bus-path.component';
import {MsToTimePipe} from './pipes/ms-to-time.pipe';


@NgModule({
  declarations: [
    FontSizeAccessibilityComponent,
    BusPathComponent,
    MsToTimePipe
  ],
  imports: [
    CommonModule,
    ProductiveModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ProductiveModule,
    ReactiveFormsModule,
    MsToTimePipe,
    BusPathComponent,
    FormsModule
  ]
})
export class SharedModule {
}
