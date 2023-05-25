import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldsetComponent} from './components/fieldset/fieldset.component';
import {ButtonComponent} from './components/button/button.component';
import {RippleDirective} from './directives/ripple.directive';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';

const components: any[] = [FieldsetComponent, ButtonComponent, AutocompleteComponent];
const directives: any[] = [
  RippleDirective
];

@NgModule({
  declarations: [
    components,
    directives,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    components,
    directives
  ]
})
export class ProductiveModule {
}
