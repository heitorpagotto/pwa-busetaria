import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BusLineComponent} from "./components/bus-line/bus-line.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'bus-line',
    component: BusLineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
