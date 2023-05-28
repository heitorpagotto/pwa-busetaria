import {Component, OnInit} from '@angular/core';
import {UserModel} from "./shared/models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa-busetaria';

  public ngOnInit(): void {
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
