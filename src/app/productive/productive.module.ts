import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldsetComponent} from './components/fieldset/fieldset.component';
import {RippleDirective} from './directives/ripple.directive';
import {AutocompleteComponent} from "./components/autocomplete/autocomplete.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  ModalCloseDirective,
  ModalComponent,
  ModalContentComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTriggerDirective
} from './components/modal/modal.component';

const components: any[] = [FieldsetComponent, AutocompleteComponent, ModalComponent,
  ModalHeaderComponent, ModalFooterComponent, ModalContentComponent];
const directives: any[] = [
  RippleDirective,
  ModalCloseDirective,
  ModalTriggerDirective
];

@NgModule({
  declarations: [
    components,
    directives,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    components,
    directives
  ]
})
export class ProductiveModule {
}
