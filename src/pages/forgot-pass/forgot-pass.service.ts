import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ForgotPassGetService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "get");
  }
}

@Injectable()
export class ForgotPassPostService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "post");
  }
  user = {
    email: "",
    senha: ""
  };
  forgotPass(email: string) {
    return this.callMethod("resetPassword", { email });
  }
}
