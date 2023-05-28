import {Injectable} from '@angular/core';
import {LoginRequestModel} from "../../shared/models/login-request.model";
import {UserModel} from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public login(model: LoginRequestModel): boolean {
    const usersString: string | null = sessionStorage.getItem('users');
    if (usersString) {
      const userParsed: UserModel[] = JSON.parse(usersString);
      const idx = userParsed.findIndex(x => (x.name.includes(model.user) || x.email.includes(model.user)) && x.password == model.password)
      return idx >= 0;
    }
    return false;
  }

  public register(model: UserModel): boolean {
    const usersString: string | null = sessionStorage.getItem('users');
    if (usersString) {
      const userParsed: UserModel[] = JSON.parse(usersString);
      const newId = userParsed.length + 1;

      model.id = newId;
      userParsed.push(model);
      sessionStorage.setItem('users', JSON.stringify(userParsed));
      return true;
    }
    return false;
  }
}
