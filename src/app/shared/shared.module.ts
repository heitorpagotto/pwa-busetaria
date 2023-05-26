import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductiveModule} from "../productive/productive.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FontSizeAccessibilityComponent } from './components/font-size-accessibility/font-size-accessibility.component';


@NgModule({
  declarations: [
    FontSizeAccessibilityComponent
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
    FormsModule
  ]
})
export class SharedModule {
}
