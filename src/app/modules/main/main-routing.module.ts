import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {canActivateTeamLoggedIn} from "../../guards/logged.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('../auth/auth.module').then((e) => e.AuthModule),
      },
      {
        path: 'user',
        canActivate: [canActivateTeamLoggedIn],
        loadChildren: () => import('../user/user.module').then((e) => e.UserModule)
      },
      {
        path: '',
        loadChildren: () => import('../home/home.module').then((e) => e.HomeModule)
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
