import {Component, OnInit} from '@angular/core';
import {UserModel} from "./shared/models/user.model";
import {PwaService} from "./services/pwa/pwa.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa-busetaria';

  constructor(private _pwaService: PwaService) {
    this._pwaService.verifyUpdate();
  }

  public ngOnInit(): void {
    interval(600000).subscribe(() => this._pwaService.verifyUpdate());

    const adminUser: UserModel = {
      id: 1,
      email: 'admin@test.com',
      name: 'admin',
      password: '123',
      phone: '199999999'
    };

    const userArray: string | null = sessionStorage.getItem('users');

    if (!userArray) {
      let usersArray: UserModel[] = [adminUser];
      sessionStorage.setItem('users', JSON.stringify(usersArray));
    }
  }
}
