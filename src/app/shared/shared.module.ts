import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductiveModule} from "../productive/productive.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductiveModule,
  ],
  exports: [
    ProductiveModule
  ]
})
export class SharedModule {
}
