import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavController } from "ionic-angular";

@Injectable()
export class LoginGetService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "get", _navCtrl);
  }
}

@Injectable()
export class LoginPostService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "post", _navCtrl);
  }

  login(email: string, senha: string) {
    return this.callMethod("login", { email, senha });
  }

  register(user: any) {
    return this.callMethod("register", user);
  }

  connectWithFacebook(facebookUser: any) {
    facebookUser = JSON.stringify(facebookUser);
    return this.callMethod("fbLogin", { facebookUser });
  }
}
