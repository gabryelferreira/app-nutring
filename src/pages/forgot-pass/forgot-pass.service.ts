import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavController } from "ionic-angular";

@Injectable()
export class ForgotPassGetService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "get", _navCtrl);
  }
}

@Injectable()
export class ForgotPassPostService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "post", _navCtrl);
  }
  user = {
    email: "",
    senha: ""
  };
  forgotPass(email: string) {
    return this.callMethod("resetPassword", { email });
  }
}
