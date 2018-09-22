import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HomeGetService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "get");
  }
}

@Injectable()
export class HomePostService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "post");
  }

  getDailyKcal(id_usuario) {
    return this.callMethod("getUserDailyKcal", { id_usuario });
  }
}
